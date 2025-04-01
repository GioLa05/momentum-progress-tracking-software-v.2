import React from "react";
import styles from "./RankButton.module.css";
import { clsx } from "clsx";

type Props = {
  color: "pink" | "orange" | "blue" | "yellow" | "green" | "purple" | "red" | "teal";
  text:
    | "ადმინისტრაცია"
    | "ადამიანური რესურსები"
    | "ფინანსები"
    | "მარკეტინგი"
    | "ლოჯისტიკა"
    | "ინფ. ტექ."
    | "მედია"
    | "დიზაინი";
};

const RankButton = (props: Props) => {
  return (
    <div className={clsx(styles.button, styles[props.color])}>
      {props.text.slice(0, 9) + "..."}
    </div>
  );
};

export default RankButton;
