import React from "react";
import styles from "./answer.module.css";
import Image from "next/image";
import AnswerBtn from "../AnswerBtn/answerBtn";

type Props = {
  type?: 'question' | 'answer';
  name?: string;
  text?: string;
  imageSrc?: string;
};

const Answer = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoLeft}>
        <Image src={props.imageSrc} alt="user" width={38} height={38} />
      </div>
      <div className={styles.infoRight}>
        <div className={styles.text}>
          <p className={styles.h1}>{props.name}</p>
          <p className={styles.h2}>{props.text}</p>
        </div>
        {props.type === 'question' && <AnswerBtn />}
      </div>
    </div>
  );
};

export default Answer;