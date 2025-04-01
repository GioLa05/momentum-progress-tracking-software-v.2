import React from "react";
import styles from "./SelectedFilter.module.css";
import Image from "next/image";

type Props = {
  name: string;
  onClear: () => void;
};

const SelectedFilter = ({ name, onClear }: Props) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{name}</span>
      <button
        className={styles.clearButton}
        onClick={onClear}
        aria-label={`წაშლა: ${name}`}
      >
        <Image src="/x.svg" width={14} height={14} alt="x" />
      </button>
    </div>
  );
};

export default SelectedFilter;
