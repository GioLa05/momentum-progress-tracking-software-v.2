import React from "react";
import styles from "./Task.module.css";
import Level from "../Level/Level";
import RankButton from "../RankButton/RankButton";
import Image from "next/image";

type Props = {
  borderColor?: string;
  comments: number;
  date: string;
  title: string;
  description: string;
};

const Task = ({ borderColor, comments, date, title, description }: Props) => {
  return (
    <button className={styles.button} style={{ borderColor }}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <Level priority="high" size="small" />
          <RankButton color="pink" text="დიზაინი" />
        </div>
        <p>{date}</p>
      </div>
      <div className={styles.middle}>
        <p className={styles.h1}>{title}</p>
        <p className={styles.h2}>{description}</p>
      </div>
      <div className={styles.bottom}>
        <Image src={"/Coworker.png"} width={31} height={31} alt="coworker" />
        <div className={styles.bottomRight}>
          <Image src={"comment.svg"} width={22} height={22} alt="comment" />
          <p>{comments}</p>
        </div>
      </div>
    </button>
  );
};

export default Task;
