import type { Question } from "../../api/types";
import DifficultyEmote from "../DifficultyEmote/DifficultyEmote";
import styles from "./QuestionHeader.module.css";

type Props = {
  question: Question;
};

const QuestionHeader = (props: Props) => {
  return (
    <header className={styles.header}>
      <h2 className={styles.title}>{props.question.title}</h2>
      <div className={styles.row}>
        {props.question.tags.map((tag) => (
          <span key={tag.slug} className={styles.chip}>
            {tag.name}
          </span>
        ))}
      </div>
      <div className={styles.difficultyRow}>
        <DifficultyEmote
          difficulty={props.question.difficulty}
          size="large"
          className={styles.emote}
        />
        <p className={styles.difficulty}>{props.question.difficulty}</p>
      </div>
    </header>
  );
};

export default QuestionHeader;
