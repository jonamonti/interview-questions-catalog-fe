import request from "./client";
import type {
  ListQuestionsParams,
  Question,
  QuestionListResponse,
} from "./types";

export const getQuestion = (id: number): Promise<Question> => {
  return request<Question>(`/questions/${id}`);
};

export const getQuestions = (
  params: ListQuestionsParams = {},
): Promise<QuestionListResponse> => {
  const joinedTags =
    params.tags?.length === 0 ? undefined : params.tags?.join(",");
  return request<QuestionListResponse>("/questions", {
    page: params.page,
    limit: params.limit,
    tags: joinedTags,
    match: params.match,
  });
};
