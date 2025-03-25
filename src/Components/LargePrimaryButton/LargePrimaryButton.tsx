import React from "react";
import styles from "./LargePrimaryButton.module.css";

type Props = {
  text: string;
};

const LargePrimaryButton = (props: Props) => {
  return <div className={styles.button}>{props.text}</div>;
};

export default LargePrimaryButton;
