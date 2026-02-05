import { tool } from "langchain";
import * as z from "zod";
import { getSearchResultsFromShaped } from "@/lib/shaped";
import { time, toolTimings } from "./utils";

/**
 * Constructs the full documentation URL with anchor link from metadata
 * Priority for anchor: h4 > h3 > h2 > h1
 */
function constructDocumentationUrl(metadata: any): string {
  // Remove file extension from path
  const basePath = metadata.file_path?.replace(/\.[^/.]+$/, "") || "";
  
  // Find the lowest level (most specific) header that's not empty
  const headerText = metadata.h4 || metadata.h3 || metadata.h2 || metadata.h1 || '';
  
  let anchor = '';
  if (headerText) {
    // Convert header text to anchor format:
    // 1. Convert to lowercase
    // 2. Replace spaces with hyphens
    // 3. Remove special characters except hyphens
    anchor = '#' + headerText
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }

  return `https://docs.shaped.ai/docs/v2/${basePath}${anchor}`;
}

export const searchDocuments = tool(
  async (input: { query: string, mode: "vector" | "lexical" | "hybrid" }) => {
    const stopTotal = time('searchDocuments_total');

    try {
      if (input.mode == "vector") {
        const shapedQl = `SELECT * 
        FROM text_search(
            query='$query', 
            mode='vector',
            text_embedding_ref='text_content_embedding'
        )
        LIMIT 20`
        const params = {
          query: input.query
        }
        // Shaped API timing
        const stopShaped = time('searchDocuments_shaped_api');
        const results = await getSearchResultsFromShaped("agent_rag_search_engine", shapedQl, params);
        const shapedResult = stopShaped();

        // Formatting timing
        const stopFormat = time('searchDocuments_format');
        const formatted = JSON.stringify(
          results.slice(0, 15).map((r) => ({
            title: r.metadata.name,
            content: r.metadata.content,
            url: constructDocumentationUrl(r.metadata),
          }))
        );
        const formatResult = stopFormat();
        const totalResult = stopTotal();
        
        toolTimings['searchDocuments'] = totalResult.duration;
        console.log(`[searchDocuments] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
        
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
        const stopShaped = time('searchDocuments_shaped_api');
        const results = await getSearchResultsFromShaped("agent_rag_search_engine", shapedQl, params);
        const shapedResult = stopShaped();

        // Formatting timing
        const stopFormat = time('searchDocuments_format');
        const formatted = JSON.stringify(
          results.slice(0, 15).map((r) => ({
            title: r.metadata.name,
            content: r.metadata.content,
            url: constructDocumentationUrl(r.metadata),
          }))
        );
        const formatResult = stopFormat();
        const totalResult = stopTotal();
        
        toolTimings['searchDocuments'] = totalResult.duration;
        console.log(`[searchDocuments] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
        
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
            text_embedding_ref='text_content_embedding',
            limit=10
        )
        LIMIT 20`
        const params = {
          query: input.query
        }
        // Shaped API timing
        const stopShaped = time('searchDocuments_shaped_api');
        const results = await getSearchResultsFromShaped("agent_rag_search_engine", shapedQl, params);
        const shapedResult = stopShaped();

        // Formatting timing
        const stopFormat = time('searchDocuments_format');
        const formatted = JSON.stringify(
          results.slice(0, 15).map((r) => ({
            title: r.metadata.name,
            content: r.metadata.content,
            url: constructDocumentationUrl(r.metadata),
          }))
        );
        const formatResult = stopFormat();
        const totalResult = stopTotal();
        
        toolTimings['searchDocuments'] = totalResult.duration;
        console.log(`[searchDocuments] shaped_api: ${shapedResult.duration.toFixed(2)}ms, format: ${formatResult.duration.toFixed(2)}ms, total: ${totalResult.duration.toFixed(2)}ms`);
        
        return formatted;
      }
      
      return JSON.stringify({ error: "Invalid search mode" });
    } catch (error) {
      const totalResult = stopTotal();
      toolTimings['searchDocuments'] = totalResult.duration;
      
      // Log error for Vercel logs
      console.error(`[searchDocuments] Error during ${input.mode} search:`, {
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
        message: "I encountered an error while searching the documentation. The search service may be temporarily unavailable."
      });
    }
  },
  {
    name: "search_documents",
    description: "Search the Shaped documentation for relevant content about a given topic",
    schema: z.object({
      query: z.string().describe("The search query to find relevant documents"),
      mode: z.enum(["vector", "lexical", "hybrid"])
        .describe(`The search mode. 
          Choose "vector" for semantic search: to return docs containing similar semantic meaning or phrase content to the input. 
          Choose "lexical" for BM25 lexical search: to return docs with specific keywords or IDs.
          Choose "hybrid" for a mix of strategies: 50% vector and 50% lexical.`)
    }),
  }
);
