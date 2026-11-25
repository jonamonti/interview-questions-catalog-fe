import QuestionCard from "../components/QuestionCard/QuestionCard";
import useQuestions from "../hooks/useQuestions";
import useTags from "../hooks/useTags";
import styles from "./HomePage.module.css";
import useSelectedQuestionId from "../hooks/useSelectedQuestionId";
import { Outlet, useNavigate } from "react-router";

const HomePage = () => {
  const questions = useQuestions({});
  const tags = useTags();
  const selectedId = useSelectedQuestionId();
  const navigate = useNavigate();

  const handleSelect = (id: number) => {
    navigate(`/questions/${id}`);
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Questions <br /> I got asked
          </h1>
          {questions.data && tags.data ? (
            <p className={styles.statusLine}>
              {questions.data.total} questions · {tags.data.list.length} topics
              · from my own interviews
            </p>
          ) : questions.data === undefined && questions.isError ? (
            <p className={styles.statusLine}>Questions didn't load</p>
          ) : (
            <p className={styles.statusLine}>Loading questions…</p>
          )}
        </header>
        <ul className={styles.list}>
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
      </aside>
      <main className={styles.panel} aria-live="polite">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
