import React from "react";
import styles from "./page.module.css";
import CreateNewTask from "../Components/CreateNewTask/CreateNewTask";
import Answer from "../Components/Answer/answer";
import CreateAnEmployee from "../Components/CreateAnEmployee/createAnEmployee";
import LargePrimaryButton from "@/Components/LargePrimaryButton/LargePrimaryButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <CreateNewTask />
      <Answer />
      <CreateAnEmployee />
      <LargePrimaryButton />
    </div>
  );
}
