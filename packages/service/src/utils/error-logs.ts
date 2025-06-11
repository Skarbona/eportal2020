export const logControllerError = (endpoint: string, error: unknown): void => {
  const now = new Date().toISOString();
  if (error instanceof Error) {
    console.error(`[${now}] Error occurred at ${endpoint}:`, error.message);
  } else {
    console.error(`[${now}] An unknown error occurred at ${endpoint}:`, error);
  }
};
