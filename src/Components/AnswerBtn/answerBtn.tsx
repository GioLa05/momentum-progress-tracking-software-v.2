import React from "react";
import styles from "./answerBtn.module.css";
import Image from "next/image";

type Props = {
  onClick?: () => void;
};

const AnswerBtn = ({ onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <Image src="/left.svg" alt="left" width={16} height={16} />
      <p>უპასუხე</p>
    </button>
  );
};

export default AnswerBtn;
