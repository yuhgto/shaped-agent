import * as cheerio from "cheerio";
import { time } from "./utils";

export const getBlogContent = async (url: string): Promise<string> => {
  const stopTotal = time('getBlogContent_total');
  try {
    // Fetch timing
    const stopFetch = time('getBlogContent_fetch');
    const response = await fetch(url);
    if (!response.ok) {
      const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      
      // Log detailed error for Vercel logs
      console.error('[getBlogContent] HTTP error:', {
        url,
        status: response.status,
        statusText: response.statusText
      });
      
      throw new Error(errorMessage);
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
    
    // Log detailed error for Vercel logs
    console.error('[getBlogContent] Error fetching blog content:', {
      url,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      duration: totalResult.duration
    });
    
    console.log(`[getBlogContent] total: ${totalResult.duration.toFixed(2)}ms (error)`);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `Error: Could not fetch content from ${url}. ${errorMessage}`;
  }
}
