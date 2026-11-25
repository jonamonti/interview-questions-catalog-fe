import { useEffect } from "react";
import useQuestions from "./useQuestions";
import useQuestionFilters from "./useQuestionFilters";

// The questions before and after `id` in the list the user is browsing.
// It reads the same query as the sidebar, so it makes no extra request, except
// to load the next page when `id` is the last loaded question.
const useQuestionNeighbours = (id: number | undefined) => {
  const { filters } = useQuestionFilters();
  const questions = useQuestions(filters);
  const list = questions.data?.questions ?? [];
  const index = id === undefined ? -1 : list.findIndex((q) => q.id === id);

  const { hasNextPage, isFetching, fetchNextPage } = questions;
  const isLastLoaded = index !== -1 && index === list.length - 1;

  useEffect(() => {
    if (isLastLoaded && hasNextPage && !isFetching) fetchNextPage();
  }, [isLastLoaded, hasNextPage, isFetching, fetchNextPage]);

  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: list[index - 1], next: list[index + 1] };
};

export default useQuestionNeighbours;
