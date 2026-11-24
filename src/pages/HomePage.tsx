import { useState } from "react";
import QuestionCard from "../components/QuestionCard/QuestionCard";
import useQuestions from "../hooks/useQuestions";
import useTags from "../hooks/useTags";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const questions = useQuestions({});
  const tags = useTags();
  const [selected, setSelected] = useState<number | null>(null);
  const handleSelect = (id: number) => {
    setSelected(id);
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
                    isSelected={selected === question.id}
                    onSelect={handleSelect}
                  />
                </li>
              );
            })}
        </ul>
      </aside>
      <main className={styles.panel}></main>
    </div>
  );
};

export default HomePage;
