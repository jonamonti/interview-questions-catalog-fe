import { useEffect, useRef } from "react";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import useQuestions from "../hooks/useQuestions";
import useTags from "../hooks/useTags";
import styles from "./HomePage.module.css";
import useSelectedQuestionId from "../hooks/useSelectedQuestionId";
import { Outlet, useLocation, useNavigate } from "react-router";
import useQuestionFilters, { NO_FILTERS } from "../hooks/useQuestionFilters";
import TopicChip from "../components/TopicChip/TopicChip";
import MatchToggle from "../components/MatchToggle/MatchToggle";
import NoMatch from "../components/NoMatch/NoMatch";

const HomePage = () => {
  const { filters, toggleTag, setMatch, clearFilters } = useQuestionFilters();
  const { search } = useLocation();
  const questions = useQuestions(filters);
  // The header shows the overall count, which doesn't change with the filters.
  // With no filters selected, this is the same query as `questions`.
  const allQuestions = useQuestions(NO_FILTERS);
  const tags = useTags();
  const selectedId = useSelectedQuestionId();
  const navigate = useNavigate();

  // The panel keeps its scroll position when the route changes, so a click on
  // "Next" at the bottom of one answer would open the next one at the bottom.
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [selectedId]);

  const handleSelect = (id: number) => {
    navigate({ pathname: `/questions/${id}`, search });
  };

  const total = allQuestions.data?.total;
  const shown = questions.data?.total;
  const resultLine =
    total === undefined || shown === undefined
      ? ""
      : shown === total
        ? `${total} questions`
        : `${shown} of ${total} questions`;
  const isEmpty =
    questions.data !== undefined &&
    questions.data.questions.length === 0 &&
    !questions.isPlaceholderData;

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Questions <br /> I got asked
          </h1>
          {allQuestions.data && tags.data ? (
            <p className={styles.statusLine}>
              {allQuestions.data.total} questions · {tags.data.list.length}{" "}
              topics · from my own interviews
            </p>
          ) : allQuestions.data === undefined && allQuestions.isError ? (
            <p className={styles.statusLine}>Questions didn't load</p>
          ) : (
            <p className={styles.statusLine}>Loading questions…</p>
          )}
        </header>
        <section className={styles.filters} aria-label="Filters">
          <div className={styles.filtersRow}>
            <span className={styles.resultLine}>{resultLine}</span>
            <MatchToggle value={filters.match} onChange={setMatch} />
          </div>
          <ul className={styles.chipList} aria-label="Topics">
            {tags.data?.list.map((tag) => (
              <li key={tag.id}>
                <TopicChip
                  label={tag.name}
                  count={tag.questionCount}
                  isActive={filters.tags.includes(tag.slug)}
                  onToggle={() => toggleTag(tag.slug)}
                />
              </li>
            ))}
          </ul>
        </section>
        {isEmpty ? (
          <NoMatch match={filters.match} onClear={clearFilters} />
        ) : (
          <ul
            className={[
              styles.list,
              questions.isPlaceholderData && styles.loading,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-busy={questions.isPlaceholderData}
          >
            {questions.data &&
              questions.data.questions.map((question) => {
                return (
                  <li key={question.id}>
                    <QuestionCard
                      question={question}
                      isSelected={selectedId === question.id}
                      onSelect={handleSelect}
                    />
                  </li>
                );
              })}
          </ul>
        )}
      </aside>
      <main ref={panelRef} className={styles.panel} aria-live="polite">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
