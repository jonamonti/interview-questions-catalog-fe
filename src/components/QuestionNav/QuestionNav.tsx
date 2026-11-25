import { Link } from "react-router";
import type { Question } from "../../api/types";
import styles from "./QuestionNav.module.css";

type Props = {
  previous?: Question;
  next?: Question;
};

const QuestionNav = (props: Props) => {
  return (
    <nav className={styles.nav} aria-label="Other questions">
      {props.previous && (
        <Link
          to={`/questions/${props.previous.id}`}
          className={[styles.link, styles.previous].join(" ")}
        >
          <span className={styles.label}>
            <span aria-hidden="true">←</span> Previous
          </span>
          <span className={styles.title}>{props.previous.title}</span>
        </Link>
      )}
      {props.next && (
        <Link
          to={`/questions/${props.next.id}`}
          className={[styles.link, styles.next].join(" ")}
        >
          <span className={styles.label}>
            Next <span aria-hidden="true">→</span>
          </span>
          <span className={styles.title}>{props.next.title}</span>
        </Link>
      )}
    </nav>
  );
};

export default QuestionNav;
