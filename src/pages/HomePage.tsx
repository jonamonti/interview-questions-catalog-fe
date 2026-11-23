import useQuestions from "../hooks/useQuestions";
import useTags from "../hooks/useTags";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const questions = useQuestions({});
  const tags = useTags();

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
      </aside>
      <main className={styles.panel}></main>
    </div>
  );
};

export default HomePage;
