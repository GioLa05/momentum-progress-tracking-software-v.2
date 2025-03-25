import React from "react";
import styles from "./progress.module.css";
import Task from "../Task/Task";

type Props = {
  text: "დასაწყები" | "პროგრესში" | "მზად ტესტირებისთვის" | "დასრულებული";
};

const getColorInfo = (text: Props["text"]) => {
  switch (text) {
    case "დასაწყები":
      return { className: styles.yellow, color: "#f7bc30" };
    case "პროგრესში":
      return { className: styles.orange, color: "#fb5607" };
    case "მზად ტესტირებისთვის":
      return { className: styles.pink, color: "#FF006E" };
    case "დასრულებული":
      return { className: styles.blue, color: "#3A86FF" };
    default:
      return { className: "", color: "#000" };
  }
};

const Progress = (props: Props) => {
  const { className, color } = getColorInfo(props.text);

  return (
    <div className={styles.container}>
      <div className={`${styles.top} ${className}`}>{props.text}</div>
      <Task
        borderColor={color}
        comments={8}
        date="22 იანვ, 2022"
        title="Redberry-ს საიტის ლენდინგის დიზაინი "
        description="შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ სექციებს, ნავიგაციას."
      />
    </div>
  );
};

export default Progress;
