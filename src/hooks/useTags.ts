import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../api/query-keys";
import { getTags } from "../api/tags";

const useTags = () => {
  return useQuery({ queryKey: queryKeys.tags, queryFn: getTags });
};

export default useTags;
