import { QueryClient } from "@tanstack/react-query";
import ApiError from "./api-error";

const retryFunction = (failureCount: number, error: Error): boolean => {
  if (error instanceof ApiError) {
    if (error.status >= 400 && error.status <= 499) return false;
  }
  if (failureCount < 3) return true;
  return false;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: retryFunction },
  },
});

export default queryClient;
