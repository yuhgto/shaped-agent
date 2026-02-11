import { NextRequest, NextResponse } from "next/server";
import { createAgent } from "langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { PostHog } from 'posthog-node';
import { LangChainCallbackHandler } from '@posthog/ai';
import { searchDocuments, readWebpage, time, toolTimings, resetToolTimings, searchApiReference } from "@/tools";

// Cache the agent instance to avoid recreating it on every request
let cachedAgent: ReturnType<typeof createAgent> | null = null;

// Initialize PostHog client
let posthogClient: PostHog | null = null;

function getPostHogClient() {
  if (!posthogClient) {
    posthogClient = new PostHog(
      process.env.POSTHOG_API_KEY!,
      { host: process.env.POSTHOG_HOST || 'https://us.i.posthog.com' }
    );
  }
  return posthogClient;
}

function getAgent() {
  if (!cachedAgent) {
    const model = new ChatAnthropic({
      model: "claude-sonnet-4-5-20250929",
      apiKey: process.env.ANTHROPIC_API_KEY,
      thinking: {
        type: "enabled",
        budget_tokens: 10000,
      },
      maxTokens: 20000,
    });

    cachedAgent = createAgent({
      model,
      tools: [searchDocuments, searchApiReference],
      systemPrompt: `
You are Allen (Al), a documentation assistant for Shaped. 
Help users find answers about the Shaped platform and API.

<basic_guidelines>
- Be concise. Prefer short, direct answers over long explanations.
- Use code examples when they clarify the answer. 
- Use search tools at your disposal. 
</basic_guidelines>


<prefer_search>
- Use search tools at your disposal. Run search at most 4 times per question.
- After retrieving search results, think carefully about whether the results are relevant to the user's query. If the results don't contain the information needed to answer the question, try searching again with a different query or search mode.
- After 4 searches, if the content is still not found or not relevant, tell the user: "I couldn't find information about this in the Shaped documentation. This topic may not be covered in the available documentation."
- When you have enough context, answer without extra searches.
- Prefer a single, focused search but use multiple when required.
- Run search at most 4 times per question.
</prefer_search>

<code_outputs>
- Use the search tool to find the correct syntax for ShapedQL, CLI commands, and API calls. 
- Include code examples when they clarify the answer (e.g., API calls, ShapedQL query syntax, engine config snippets).
- Include code examples when the user requests them
- Do not infer code syntax from your trained knowledge. 
</code_outputs>

<citing_sources>
- ALWAYS cite your sources when answering questions based on search results.
- After providing your answer, include a "Sources" section that lists all the documents and pages you referenced.
- For each source, provide:
  1. A descriptive title or name of the document
  2. A clickable link using markdown format: [Title](URL)
- Format the sources section like this:

**Sources:**
- [Document Title](https://docs.shaped.ai/path/to/doc)
- [API Reference Name](https://docs.shaped.ai/api/endpoint)

- If you used multiple sections from the same document, only list it once.
- Only cite sources that you actually used to formulate your answer.
- If a search result didn't contribute to your answer, don't include it in sources.
</citing_sources>
`,
    });
  }
  return cachedAgent;
}

export async function POST(request: NextRequest) {
  // Reset tool timings for this request
  resetToolTimings();
  
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Create PostHog callback handler for LLM analytics
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const phClient = getPostHogClient();
    const callbackHandler = new LangChainCallbackHandler({
      client: phClient,
      distinctId: `user_${Date.now()}`, // TODO: Use actual user ID when authentication is implemented
      properties: {
        conversation_id: crypto.randomUUID(),
        user_message: lastUserMessage,
      },
      debug: true, // Enable debug logging to verify events
    });

    // Create a ReadableStream for streaming responses
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const stopAgent = time('agent_stream');
        
        try {
          // Get or create the agent instance
          const agent = getAgent();
          
          // Stream agent responses with messages mode to get LLM tokens
          // Pass request.signal so the agent stops when the client disconnects (e.g. user clicks stop)
          const stream = await agent.stream(
            { messages },
            { 
              streamMode: "messages",
              callbacks: [callbackHandler],
              signal: request.signal
            }
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
          // Client disconnected (e.g. user clicked stop) - close cleanly without sending error
          const isAbort = request.signal?.aborted || (error instanceof Error && error.name === "AbortError");
          if (isAbort) {
            controller.close();
            return;
          }
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
