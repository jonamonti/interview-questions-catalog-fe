import type { Question } from "../../api/types";
import DifficultyEmote from "../DifficultyEmote/DifficultyEmote";
import TopicIcon from "../TopicIcon/TopicIcon";
import styles from "./QuestionCard.module.css";

type Props = {
  question: Question;
  isSelected: boolean;
  onSelect: () => void;
};

const QuestionCard = (props: Props) => {
  return (
    <button
      type="button"
      aria-current={props.isSelected ? "true" : undefined}
      className={styles.button}
      onClick={props.onSelect}
    >
      <TopicIcon tags={props.question.tags} className={styles.topicIcon} />
      <span className={styles.textColumn}>
        <span className={styles.title}>{props.question.title}</span>
        <span className={styles.preview}>{props.question.preview}</span>
      </span>
      <DifficultyEmote
        difficulty={props.question.difficulty}
        className={styles.difficulty}
      />
    </button>
  );
};

export default QuestionCard;
