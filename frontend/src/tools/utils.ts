// Timing helper function
export const time = (label: string) => {
  const start = performance.now();
  return () => {
    const duration = performance.now() - start;
    return { label, duration };
  };
};

// Track tool execution times for summary
export const toolTimings: Record<string, number> = {};

// Reset tool timings
export const resetToolTimings = () => {
  Object.keys(toolTimings).forEach(key => delete toolTimings[key]);
};
