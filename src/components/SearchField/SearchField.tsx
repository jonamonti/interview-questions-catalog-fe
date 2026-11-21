import { type ComponentProps } from "react";
import styles from "./SearchField.module.css";

type Props = ComponentProps<"input"> & { label: string };

const SearchField = ({ label, ...rest }: Props) => {
  return (
    <label className={styles.label}>
      <span className={styles.sr}>{label}</span>
      <input type="search" {...rest} className={styles.search} />
    </label>
  );
};

export default SearchField;
