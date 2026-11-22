import { API_URL } from "../config";
import ApiError from "./api-error";
import type { ApiResponse } from "./types";

const API_PREFIX = "/api";

const request = async <T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
) => {
  const url = new URL(`${API_URL}${API_PREFIX}${path}`);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    throw new ApiError("Could not reach the API.", {
      code: "NETWORK_ERROR",
      status: 0,
      cause: error,
    });
  }
  let body: ApiResponse<T>;
  try {
    body = (await response.json()) as ApiResponse<T>;
  } catch (error) {
    throw new ApiError("Invalid response", {
      code: "INVALID_RESPONSE",
      status: response.status,
      cause: error,
    });
  }

  if (body.success && response.ok) {
    return body.data;
  } else if (body.success === false) {
    throw new ApiError(body.message, {
      status: response.status,
      code: body.error.code,
      details: body.error.details,
    });
  } else {
    throw new ApiError("Invalid response", {
      status: response.status,
      code: "INVALID_RESPONSE",
    });
  }
};

export default request;
