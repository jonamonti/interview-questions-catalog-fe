import type { ComponentProps } from "react";
import styles from "./PillButton.module.css";

type Props = ComponentProps<"button">;

const PillButton = (props: Props) => {
  return <button type="button" {...props} className={styles.pill} />;
};

export default PillButton;
