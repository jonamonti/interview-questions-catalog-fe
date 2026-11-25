import type { Match } from "../../api/types";
import PillButton from "../PillButton/PillButton";
import styles from "./NoMatch.module.css";

type Props = {
  match: Match;
  onClear: () => void;
};

const NoMatch = (props: Props) => {
  return (
    <div className={styles.box}>
      <p className={styles.title}>No match</p>
      <p className={styles.text}>
        {props.match === "all"
          ? "No question has all of those topics. Switch to Any, or clear the filters."
          : "No question has any of those topics. Clear the filters to see them all."}
      </p>
      <PillButton onClick={props.onClear}>Clear filters</PillButton>
    </div>
  );
};

export default NoMatch;
