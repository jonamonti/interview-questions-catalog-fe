import type { Tag } from "../../api/types";
import { getTopicIcon } from "./topic-icons";
import styles from "./TopicIcon.module.css";

type Props = {
  tags: Tag[];
  className?: string;
};

const TopicIcon = (props: Props) => {
  const icon = getTopicIcon(props.tags);
  return (
    <span className={[styles.icon, props.className].filter(Boolean).join(" ")}>
      <svg
        className={styles.svg}
        viewBox="0 0 24 24"
        width={icon.size}
        height={icon.size}
        role="img"
        aria-label={icon.label}
        fill={icon.kind === "brand" ? "currentColor" : "none"}
        stroke={icon.kind === "line" ? "currentColor" : "none"}
        strokeWidth={icon.kind === "line" ? 1.7 : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
};

export default TopicIcon;
