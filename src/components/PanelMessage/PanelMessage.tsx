import PillButton from "../PillButton/PillButton";
import styles from "./PanelMessage.module.css";

type Props = {
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
};

const PanelMessage = (props: Props) => {
  return (
    <div role="alert" className={styles.message}>
      <p className={styles.title}>{props.title}</p>
      <p className={styles.text}>{props.text}</p>
      {props.actionLabel && (
        <PillButton onClick={props.onAction}>{props.actionLabel}</PillButton>
      )}
    </div>
  );
};

export default PanelMessage;
