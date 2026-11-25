import { useSearchParams } from "react-router";
import type { Match, QuestionFilters } from "../api/types";

const DEFAULT_MATCH = "any";

// The filters when nothing is selected. Same shape as `filters` below, so both
// share one query (and one cache entry).
export const NO_FILTERS: QuestionFilters = { tags: [], match: DEFAULT_MATCH };

const parseMatch = (value: string | null): Match =>
  value === "all" || value === "any" ? value : DEFAULT_MATCH;

const toggleInList = (list: string[], item: string): string[] => {
  const next = list.includes(item)
    ? list.filter((el) => el !== item)
    : [...list, item];
  return next.sort();
};

const useQuestionFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];
  const match = parseMatch(searchParams.get("match"));

  const update = (nextTags: string[], nextMatch: Match) => {
    const next = new URLSearchParams(searchParams);
    if (nextTags.length > 0) next.set("tags", nextTags.join(","));
    else next.delete("tags");
    if (nextMatch !== DEFAULT_MATCH) next.set("match", nextMatch);
    else next.delete("match");
    setSearchParams(next);
  };

  const toggleTag = (slug: string) => update(toggleInList(tags, slug), match);
  const setMatch = (nextMatch: Match) => update(tags, nextMatch);
  const clearFilters = () => update([], DEFAULT_MATCH);

  return {
    filters: {
      tags,
      match,
    },
    toggleTag,
    setMatch,
    clearFilters,
  };
};

export default useQuestionFilters;
