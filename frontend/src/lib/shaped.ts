const API_KEY = process.env.SHAPED_API_KEY ?? "";

export interface MainImage {
  fileId: string;
  url: string;
  alt: string | null;
}

export type ResultMetadata = Record<string, any>;

export interface SearchResult {
  id: string;
  score: number;
  metadata: ResultMetadata;
}

interface ShapedResponse {
  results: SearchResult[];
  entity_type: string;
  explanation?: {
    query_name: string;
    query_type: string;
    parameters: Record<string, string>;
    total_execution_time_ms: number;
    final_result_count: number;
    limit_applied: number;
  };
}

export async function getSearchResultsFromShaped(
  engineName: string,
  shapedQl: string,
  parameters: Record<string, any>
): Promise<SearchResult[]> {
  const queryEndpoint = `https://api.shaped.ai/v2/engines/${engineName}/query`;
  
  try {
    const res = await fetch(queryEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        query: shapedQl,
        return_metadata: true,
        parameters: parameters
      }),
    });

    if (!res.ok) {
      // Get the full error response for logging
      const errorBody = await res.text();
      const errorMessage = `Shaped API error: ${res.status} ${res.statusText}`;
      
      // Log detailed error for debugging in Vercel logs
      console.error('[getSearchResultsFromShaped] API request failed:', {
        endpoint: queryEndpoint,
        engineName,
        status: res.status,
        statusText: res.statusText,
        errorBody,
        query: shapedQl,
        parameters
      });
      
      // Throw error with detailed message
      throw new Error(`${errorMessage}\nResponse: ${errorBody}`);
    }

    const data: ShapedResponse = await res.json();
    
    return data.results || [];
  } catch (error) {
    // Log the full error context
    console.error('[getSearchResultsFromShaped] Request failed:', {
      endpoint: queryEndpoint,
      engineName,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Re-throw to allow calling function to handle and report to agent
    throw error;
  }
}

