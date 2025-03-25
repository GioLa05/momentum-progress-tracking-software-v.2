import React from "react";
import styles from "./RankButton.module.css";
import { clsx } from "clsx";

type Props = {
  color: "pink" | "orange" | "blue" | "yellow";
  text: "დიზაინი" | "მარკეტინგი" | "ლოჯისტიკა" | "ინფ. ტექ.";
};


const RankButton = (props: Props) => {
  return (
    <div className={clsx(styles.button, styles[props.color])}>
      {props.text}
    </div>
  );
};

export default RankButton;
