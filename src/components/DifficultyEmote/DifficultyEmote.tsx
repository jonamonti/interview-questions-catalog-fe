import type { Difficulty } from "../../api/types";
import styles from "./DifficultyEmote.module.css";
import easyHead from "../../assets/difficulty/difficulty-easy-head.svg";
import mediumHead from "../../assets/difficulty/difficulty-medium-head.svg";
import hardHead from "../../assets/difficulty/difficulty-hard-head.svg";
import easyFull from "../../assets/difficulty/difficulty-easy.svg";
import mediumFull from "../../assets/difficulty/difficulty-medium.svg";
import hardFull from "../../assets/difficulty/difficulty-hard.svg";

type Props = {
  difficulty: Difficulty;
  size?: "small" | "large";
  className?: string;
};

const mapDifficultyToHeadImg: Record<Difficulty, string> = {
  easy: easyHead,
  medium: mediumHead,
  hard: hardHead,
};

const mapDifficultyToFullImg: Record<Difficulty, string> = {
  easy: easyFull,
  medium: mediumFull,
  hard: hardFull,
};

const mapDifficultyToLabel: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const DifficultyEmote = (props: Props) => {
  const images =
    props.size === "large" ? mapDifficultyToFullImg : mapDifficultyToHeadImg;

  return (
    <span
      className={[styles.tile, props.className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`Difficulty: ${mapDifficultyToLabel[props.difficulty]}`}
    >
      <img className={styles.img} src={images[props.difficulty]} alt="" />
    </span>
  );
};

export default DifficultyEmote;
