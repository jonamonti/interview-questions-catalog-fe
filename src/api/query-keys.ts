export const queryKeys = {
  tags: ["tags"],
  questions: {
    detail: (id: number | undefined) => ["questions", "detail", id] as const,
  },
} as const;
