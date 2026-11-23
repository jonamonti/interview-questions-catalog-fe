export type Difficulty = "easy" | "medium" | "hard";
export type Tag = {
  id: number;
  name: string;
  slug: string;
};

export type TagWithCount = Tag & {
  questionCount: number;
};

export type Question = {
  id: number;
  title: string;
  // Markdown. `lead` is the first paragraph of `answer` and `body` is the rest
  // (empty for a single paragraph); the API computes both.
  answer: string;
  lead: string;
  body: string;
  difficulty: Difficulty;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type TagListResponse = {
  list: TagWithCount[];
};

export type QuestionListResponse = {
  list: Question[];
  pagination: Pagination;
};

export type ApiSuccess<T> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "CONFLICT"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

export type ApiErrorBody = {
  success: false;
  message: string;
  error: {
    code: ErrorCode;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiErrorBody;

export type Match = "all" | "any";

export type QuestionFilters = {
  tags?: string[];
  match?: Match;
};

export type ListQuestionsParams = QuestionFilters & {
  page?: number;
  limit?: number;
};
