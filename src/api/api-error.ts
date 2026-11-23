import type { ErrorCode } from "./types";

export type ApiErrorCode = ErrorCode | "NETWORK_ERROR" | "INVALID_RESPONSE";

type ApiErrorOptions = {
  status: number;
  code: ApiErrorCode;
  details?: unknown;
  cause?: unknown;
};

class ApiError extends Error {
  status: number;
  code: ApiErrorCode;
  details?: unknown;

  constructor(message: string, options: ApiErrorOptions) {
    super(message, { cause: options.cause });
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
    this.name = "ApiError";
  }
  get isNotFound(): boolean {
    return this.code === "NOT_FOUND";
  }
}

export default ApiError;
