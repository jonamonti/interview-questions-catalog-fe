import type { Match } from "../../api/types";
import styles from "./MatchToggle.module.css";

type Props = {
  value: Match;
  onChange: (match: Match) => void;
};

const options: Match[] = ["any", "all"];

const MatchToggle = (props: Props) => {
  return (
    <div role="group" aria-label="Match topics" className={styles.toggle}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={props.value === option}
          className={[styles.option, props.value === option && styles.active]
            .filter(Boolean)
            .join(" ")}
          onClick={() => props.onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default MatchToggle;
