import React from "react";
import styles from "./Level.module.css";
import Image from "next/image";
import clsx from "clsx";

type Priority = "high" | "medium" | "low";
type Size = "big" | "small";

type Props = {
  priority: Priority;
  size: Size;
};

const getIcon = (priority: Priority) => {
  switch (priority) {
    case "high":
      return { icon: "/High.svg", text: "მაღალი", color: "red" };
    case "medium":
      return { icon: "/Medium.svg", text: "საშუალო", color: "yellow" };
    case "low":
      return { icon: "/Low.svg", text: "დაბალი", color: "green" };
    default:
      return { icon: "/Medium.svg", text: "საშუალო", color: "yellow" };
  }
};

const Level = ({ priority, size }: Props) => {
  const { icon, text, color } = getIcon(priority);

  return (
    <div className={clsx(styles.button, styles[color], styles[size])}>
      <Image
        src={icon}
        alt="Level"
        width={size === "big" ? 18 : 16}
        height={size === "big" ? 20 : 18}
      />
      <p className={styles[color]}>{text}</p>
    </div>
  );
};

export default Level;
