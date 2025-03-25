import React from "react";
import styles from "./answerBtn.module.css";
import Image from "next/image";

const AnswerBtn = () => {
  return (
    <button className={styles.button}>
      <Image src="/left.svg" alt="left" width={16} height={16} />
      <p>უპასუხე</p>
    </button>
  );
};

export default AnswerBtn;
