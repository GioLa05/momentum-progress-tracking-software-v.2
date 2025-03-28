import React from "react";
import styles from "./CreateNewTask.module.css";
import Image from "next/image";

const CreateNewTask = ({
  showImage = true,
  text = "შექმენი ახალი დავალება",
}) => {
  return (
    <button className={styles.button}>
      {showImage && <Image src="/add.svg" alt="left" width={20} height={20} />}
      <p>{text}</p>
    </button>
  );
};

export default CreateNewTask;
