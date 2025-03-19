import React from "react";
import styles from "./CreateNewTask.module.css";
import Image from "next/image";

const CreateNewTask = () => {
  return (
    <button className={styles.button}>
      <Image src="/add.svg" alt="left" width={20} height={20}/>
      <p>შექმენი ახალი დავალება</p>
    </button>
  );
};

export default CreateNewTask;
