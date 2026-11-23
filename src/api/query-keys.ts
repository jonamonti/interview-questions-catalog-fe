import type { QuestionFilters } from "./types";

export const queryKeys = {
  tags: ["tags"],
  questions: {
    detail: (id: number | undefined) => ["questions", "detail", id] as const,
    list: (filters: QuestionFilters) => ["questions", "list", filters] as const,
  },
} as const;
