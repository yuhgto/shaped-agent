import { NextRequest, NextResponse } from "next/server";
import { createAgent } from "langchain";
import { ChatAnthropic } from "@langchain/anthropic";
import { searchDocuments, readWebpage, time, toolTimings, resetToolTimings } from "@/tools";

// Cache the agent instance to avoid recreating it on every request
let cachedAgent: ReturnType<typeof createAgent> | null = null;

function getAgent() {
  if (!cachedAgent) {
    const model = new ChatAnthropic({
      model: "claude-sonnet-4-5-20250929",
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    cachedAgent = createAgent({
      model,
      tools: [searchDocuments, readWebpage],
      systemPrompt: `You are Allen (Al), a documentation assistant for Shaped. Help users find answers about the Shaped platform and API.

Guidelines:
- Be concise. Prefer short, direct answers over long explanations.
- Include code examples when they clarify the answer (e.g., API calls, ShapedQL query syntax, engine config snippets).
- Use search tools only when needed. Run search at most 4 times per question. If you still lack information after 4 searches, answer with what you have and suggest where to look.
- Prefer a single, focused search but use multiple when required.
- When you have enough context, answer without extra searches.`,
    });
  }
  return cachedAgent;
}

export async function POST(request: NextRequest) {
  // Reset tool timings for this request
  resetToolTimings();
  
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
          // Get or create the agent instance
          const agent = getAgent();
          
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
