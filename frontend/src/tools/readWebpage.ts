import { tool } from "langchain";
import * as z from "zod";
import { time, toolTimings } from "./utils";
import { getBlogContent } from "./getBlogContent";

export const readWebpage = tool(
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
    description: 
      `Fetch and extract content from a URL on the blog. 
      Only use this tool with a fully described HTTP or HTTPS url. 
      Do not use this tool if you have a file path, such as /lib/doc.md`,
    schema: z.object({
      url: z.string().describe("The full URL of the blog post to read"),
    }),
  }
);
