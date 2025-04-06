"use client";

import React from "react";
import styles from "./CreateNewTask.module.css";
import Image from "next/image";

type Props = {
  showImage?: boolean;
  text?: string;
  onClick?: () => void;
  type?: "submit" | "button";
};

const CreateNewTask = ({
  showImage = true,
  text = "შექმენი ახალი დავალება",
  onClick,
  type = "button",
}: Props) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {showImage && <Image src="/add.svg" alt="add icon" width={20} height={20} />}
      <p>{text}</p>
    </button>
  );
};

export default CreateNewTask;
