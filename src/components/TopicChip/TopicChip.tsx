import styles from "./TopicChip.module.css";

type Props = {
  label: string;
  count: number;
  isActive: boolean;
  onToggle: () => void;
};

const TopicChip = (props: Props) => {
  return (
    <button
      type="button"
      aria-pressed={props.isActive}
      className={[styles.chip, props.isActive && styles.active]
        .filter(Boolean)
        .join(" ")}
      onClick={props.onToggle}
    >
      {props.label} <span className={styles.count}>{props.count}</span>
    </button>
  );
};

export default TopicChip;
