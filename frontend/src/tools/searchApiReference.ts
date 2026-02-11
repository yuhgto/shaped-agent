import { tool } from "langchain";
import * as z from "zod";
import { getSearchResultsFromShaped } from "@/lib/shaped";
import { time, toolTimings } from "./utils";

export const searchApiReference = tool(
  async (input: { query: string, mode: "vector" | "lexical" | "hybrid" }) => {
    const stopTotal = time('searchApiReference_total');

    try {
      if (input.mode == "vector") {
        const shapedQl = `SELECT * 
        FROM text_search(
            query='$query', 
            mode='vector',
            text_embedding_ref='api_content_embedding'
        )
        LIMIT 20`
        const params = {
          query: input.query
        }
        // Shaped API timing
        const stopShaped = time('searchApiReference_shaped_api');
        const results = await getSearchResultsFromShaped("api_docs_search_engine", shapedQl, params);
        const shapedResult = stopShaped();

        // Formatting timing
        const stopFormat = time('searchApiReference_format');
        const formatted = JSON.stringify(
          results.slice(0, 15).map((r) => ({
            title: r.metadata.name,
            content: r.metadata.content,
            url: r.metadata.file_path,
          }))
        );
        const formatResult = stopFormat();
        const totalResult = stopTotal();
        
        toolTimings['searchApiReference'] = totalResult.duration;
        console.log(`[searchApiReference] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
        
        return formatted;
      } else if (input.mode == "lexical") {
        const shapedQl = `SELECT * 
        FROM text_search(
            query='$query', 
            mode='lexical',
            fuzziness=0
        )
        LIMIT 20`
        const params = {
          query: input.query
        }
        // Shaped API timing
        const stopShaped = time('searchApiReference_shaped_api');
        const results = await getSearchResultsFromShaped("api_docs_search_engine", shapedQl, params);
        const shapedResult = stopShaped();

        // Formatting timing
        const stopFormat = time('searchApiReference_format');
        const formatted = JSON.stringify(
          results.slice(0, 15).map((r) => ({
            title: r.metadata.name,
            content: r.metadata.content,
            url: r.metadata.file_path,
          }))
        );
        const formatResult = stopFormat();
        const totalResult = stopTotal();
        
        toolTimings['searchApiReference'] = totalResult.duration;
        console.log(`[searchApiReference] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
        
        return formatted;
      } else if (input.mode == "hybrid") {
        const shapedQl = `SELECT * 
        FROM text_search(
            query='$query', 
            mode='lexical',
            limit=10
        ),
        text_search(
            query='$query', 
            mode='vector',
            text_embedding_ref='api_content_embedding',
            limit=10
        )
        LIMIT 20`
        const params = {
          query: input.query
        }
        // Shaped API timing
        const stopShaped = time('searchApiReference_shaped_api');
        const results = await getSearchResultsFromShaped("api_docs_search_engine", shapedQl, params);
        const shapedResult = stopShaped();

        // Formatting timing
        const stopFormat = time('searchApiReference_format');
        const formatted = JSON.stringify(
          results.slice(0, 15).map((r) => ({
            title: r.metadata.name,
            content: r.metadata.content,
            url: r.metadata.file_path,
          }))
        );
        const formatResult = stopFormat();
        const totalResult = stopTotal();
        
        toolTimings['searchApiReference'] = totalResult.duration;
        console.log(`[searchApiReference] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
        
        return formatted;
      }
      
      return JSON.stringify({ error: "Invalid search mode" });
    } catch (error) {
      const totalResult = stopTotal();
      toolTimings['searchApiReference'] = totalResult.duration;
      
      // Log error for Vercel logs
      console.error(`[searchApiReference] Error during ${input.mode} search:`, {
        query: input.query,
        mode: input.mode,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        duration: totalResult.duration
      });
      
      // Return error message to agent
      const errorMessage = error instanceof Error ? error.message : String(error);
      return JSON.stringify({ 
        error: "Search failed", 
        details: errorMessage,
        message: "I encountered an error while searching the API reference. The search service may be temporarily unavailable."
      });
    }
  },
  {
    name: "search_api_reference",
    description: "Search the Shaped API reference for relevant content about a given topic",
    schema: z.object({
      query: z.string().describe("The search query to find relevant API content"),
      mode: z.enum(["vector", "lexical", "hybrid"])
        .describe(`The search mode. 
          Choose "vector" for semantic search: to return docs containing similar semantic meaning or phrase content to the input. 
          Choose "lexical" for BM25 lexical search: to return docs with specific keywords or IDs.
          Choose "hybrid" for a mix of strategies: 50% vector and 50% lexical.`)
    }),
  }
);
