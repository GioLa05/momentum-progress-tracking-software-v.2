import React from "react";
import styles from "./LargePrimaryButton.module.css";

type Props = {
  text: string;
  onClick?: () => void;
};

const LargePrimaryButton = ({ text, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};

export default LargePrimaryButton;
