import request from "./client";
import type { TagListResponse } from "./types";

export const getTags = (): Promise<TagListResponse> => {
  return request<TagListResponse>("/tags");
};
