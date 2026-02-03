import { tool } from "langchain";
import * as z from "zod";
import { getSearchResultsFromShaped } from "@/lib/shaped";
import { time, toolTimings } from "./utils";

export const searchDocuments = tool(
  async (input: { query: string }) => {
    const stopTotal = time('searchDocuments_total');
    
    // Shaped API timing
    const stopShaped = time('searchDocuments_shaped_api');
    const results = await getSearchResultsFromShaped(input.query);
    const shapedResult = stopShaped();
    
    // Formatting timing
    const stopFormat = time('searchDocuments_format');
    const formatted = JSON.stringify(
      results.slice(0, 15).map((r) => ({
        title: r.metadata.name,
        content: r.metadata.content,
        url: r.metadata.file_path,
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
    description: "Search the Shaped documentation for relevant content about a given topic",
    schema: z.object({
      query: z.string().describe("The search query to find relevant documents"),
    }),
  }
);
