import React from "react";
import styles from "./answer.module.css";
import Image from "next/image";
import AnswerBtn from "../AnswerBtn/answerBtn";

type Props = {
  type?: "question" | "answer";
  comment: {
    text: string;
    user?: {
      first_name: string;
      last_name: string;
      image: string | null;
    };
  };
};

const Answer = ({ type = "answer", comment }: Props) => {
  const fullName = comment.user
    ? `${comment.user.first_name} ${comment.user.last_name}`
    : "უცნობი ავტორი";

  const imageToShow =
    comment.user && comment.user.image && comment.user.image.trim() !== ""
      ? comment.user.image
      : "/Coworker.png";

  return (
    <div className={styles.container}>
      <div className={styles.infoLeft}>
        <Image src={imageToShow} alt="user" width={38} height={38} />
      </div>
      <div className={styles.infoRight}>
        <div className={styles.text}>
          <p className={styles.h1}>{fullName}</p>
          <p className={styles.h2}>{comment.text}</p>
        </div>
        {type === "question" && <AnswerBtn />}
      </div>
    </div>
  );
};

export default Answer;
