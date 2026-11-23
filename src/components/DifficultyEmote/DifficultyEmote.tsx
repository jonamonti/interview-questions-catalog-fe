import type { Difficulty } from "../../api/types";
import styles from "./DifficultyEmote.module.css";
import easyHead from "../../assets/difficulty/difficulty-easy-head.svg";
import mediumHead from "../../assets/difficulty/difficulty-medium-head.svg";
import hardHead from "../../assets/difficulty/difficulty-hard-head.svg";

type Props = {
  difficulty: Difficulty;
  className?: string;
};

const mapDifficultyToImg: Record<Difficulty, string> = {
  easy: easyHead,
  medium: mediumHead,
  hard: hardHead,
};

const mapDifficultyToLabel: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const DifficultyEmote = (props: Props) => {
  return (
    <span
      className={[styles.tile, props.className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`Difficulty: ${mapDifficultyToLabel[props.difficulty]}`}
    >
      <img
        className={styles.img}
        src={mapDifficultyToImg[props.difficulty]}
        alt=""
      />
    </span>
  );
};

export default DifficultyEmote;
