import { NextRequest, NextResponse } from "next/server";
import { createAgent, tool } from "langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import * as cheerio from "cheerio";
import * as z from "zod";
import { getSearchResultsFromShaped } from "@/lib/shaped";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? "";

// Timing helper function
const time = (label: string) => {
  const start = performance.now();
  return () => {
    const duration = performance.now() - start;
    return { label, duration };
  };
};

// Track tool execution times for summary
const toolTimings: Record<string, number> = {};

const searchDocuments = tool(
  async (input: { query: string }) => {
    const stopTotal = time('searchDocuments_total');
    
    // Shaped API timing
    const stopShaped = time('searchDocuments_shaped_api');
    const results = await getSearchResultsFromShaped(input.query);
    const shapedResult = stopShaped();
    
    // Formatting timing
    const stopFormat = time('searchDocuments_format');
    const formatted = JSON.stringify(
      results.slice(0, 5).map((r) => ({
        title: r.metadata.name,
        content: r.metadata.content,
        url: r.metadata.url,
        author: r.metadata.author,
      }))
    );
    const formatResult = stopFormat();
    const totalResult = stopTotal();
    
    toolTimings['searchDocuments'] = totalResult.duration;
    console.log(`[searchDocuments] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
    
    return formatted;
  },
  {
    name: "search_documents",
    description: "Search the blog for relevant documents about a given topic",
    schema: z.object({
      query: z.string().describe("The search query to find relevant documents"),
    }),
  }
);

const readWebpage = tool(
  async (input: { url: string }) => {
    const stopTotal = time('readWebpage_total');
    const pageContent = await getBlogContent(input.url);
    const totalResult = stopTotal();
    
    toolTimings['readWebpage'] = totalResult.duration;
    console.log(`[readWebpage] total: ${totalResult.duration.toFixed(2)}ms`);
    
    return pageContent;
  },
  {
    name: "read_webpage",
    description: "Fetch and extract content from a blog post URL",
    schema: z.object({
      url: z.string().describe("The URL of the blog post to read"),
    }),
  }
);

const getBlogContent = async (url: string): Promise<string> => {
  const stopTotal = time('getBlogContent_total');
  try {
    // Fetch timing
    const stopFetch = time('getBlogContent_fetch');
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const html = await response.text();
    const fetchResult = stopFetch();
    
    // Parsing timing
    const stopParse = time('getBlogContent_parse');
    const $ = cheerio.load(html);
    
    const contentParts: string[] = [];
    
    // Extract p tags with class "post_summary"
    $('p.post_summary').each((_, element) => {
      const text = $(element).text().trim();
      if (text) {
        contentParts.push(text);
      }
    });
    
    // Extract all text from descendants of div with class ".post_content" that contain ".post_rich-text"
    const postContent = $('.post_content .post_rich-text');
    if (postContent.length > 0) {
      // Target specific elements: p, ul, h1, h2, etc.
      postContent.find('p, ul, ol, h1, h2, h3, h4, h5, h6, li').each((_, element) => {
        const text = $(element).text().trim();
        if (text) {
          contentParts.push(text);
        }
      });
    }
    
    const output = contentParts.join('\n\n');
    const parseResult = stopParse();
    const totalResult = stopTotal();
    
    console.log(`[getBlogContent] fetch: ${fetchResult.duration.toFixed(2)}ms, parse: ${parseResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
    
    return output;
  } catch (error) {
    const totalResult = stopTotal();
    console.error(`Error fetching blog content from ${url}:`, error);
    console.log(`[getBlogContent] total: ${totalResult.duration.toFixed(2)}ms (error)`);
    return `Error: Could not fetch content from ${url}`;
  }
}

const model = new ChatAnthropic({
  model: "claude-sonnet-4-5-20250929",
  apiKey: ANTHROPIC_API_KEY,
});

const agent = createAgent({
  model,
  tools: [searchDocuments, readWebpage],
});

export async function POST(request: NextRequest) {
  // Reset tool timings for this request
  Object.keys(toolTimings).forEach(key => delete toolTimings[key]);
  
  try {
    const body = await request.json();
    const { query, message } = body;

    const userMessage = query || message;
    
    if (!userMessage) {
      return NextResponse.json(
        { error: "Query or message is required" },
        { status: 400 }
      );
    }

    // Create a ReadableStream for streaming responses
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const stopAgent = time('agent_stream');
        
        try {
          // Stream agent responses with messages mode to get LLM tokens
          const stream = await agent.stream(
            { messages: [{ role: "user", content: userMessage }] },
            { streamMode: "messages" }
          );

          for await (const [token, metadata] of stream) {
            // Stream each token as it arrives
            const data = JSON.stringify({
              type: "token",
              token: token,
              metadata: metadata,
            });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }

          const agentResult = stopAgent();
          
          // Calculate summary
          const totalToolTime = Object.values(toolTimings).reduce((sum, time) => sum + time, 0);
          const estimatedAnthropicTime = agentResult.duration - totalToolTime;
          
          console.log(`[agent.stream] total: ${agentResult.duration.toFixed(2)}ms`);
          console.log('---');
          console.log('Summary:');
          console.log(`- Anthropic API: ~${estimatedAnthropicTime.toFixed(2)}ms (estimated)`);
          console.log(`- Tools: ${totalToolTime.toFixed(2)}ms total`);
          Object.entries(toolTimings).forEach(([tool, time]) => {
            console.log(`  - ${tool}: ${time.toFixed(2)}ms`);
          });
          console.log(`- Total: ${agentResult.duration.toFixed(2)}ms`);
          console.log('---');

          // Send completion signal
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "done" })}\n\n`));
          controller.close();
        } catch (error) {
          console.error("Error in agent stream:", error);
          const errorData = JSON.stringify({
            type: "error",
            error: "Internal server error",
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in agent/chat route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
