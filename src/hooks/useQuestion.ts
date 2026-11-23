import { skipToken, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/query-keys";
import { getQuestion } from "../api/questions";

const useQuestion = (id: number | undefined) => {
  return useQuery({
    queryKey: queryKeys.questions.detail(id),
    queryFn: id === undefined ? skipToken : () => getQuestion(id),
  });
};

export default useQuestion;
