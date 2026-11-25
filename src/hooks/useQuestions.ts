import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import type { QuestionFilters } from "../api/types";
import { queryKeys } from "../api/query-keys";
import { getQuestions } from "../api/questions";

export const PAGE_SIZE = 8;

const useQuestions = (filters: QuestionFilters) => {
  return useInfiniteQuery({
    queryKey: queryKeys.questions.list(filters),
    queryFn: ({ pageParam }) =>
      getQuestions({ ...filters, page: pageParam, limit: PAGE_SIZE }),
    // While a new filter loads, keep showing the previous list instead of
    // emptying it (`isPlaceholderData` is true during that time).
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
    select: (data) => ({
      questions: data.pages.flatMap((page) => page.list),
      total: data.pages[0].pagination.total,
    }),
  });
};

export default useQuestions;
