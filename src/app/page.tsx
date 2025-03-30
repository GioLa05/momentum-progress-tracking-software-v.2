"use client";

import React from "react";
import styles from "./page.module.css";
// import CreateNewTask from "../Components/CreateNewTask/CreateNewTask";
// import AnswerBtn from "../Components/AnswerBtn/answerBtn";
// import CreateAnEmployee from "../Components/CreateAnEmployee/createAnEmployee";
// import LargePrimaryButton from "@/Components/LargePrimaryButton/LargePrimaryButton";
// import RankButton from "@/Components/RankButton/RankButton";
// import Level from "@/Components/Level/Level";
// import AddCoworker from "@/Components/AddCoworker/AddCoworker";
// import AddedCoworker from "@/Components/AddedCoworker/AddedCoworker";
// import Task from "@/Components/Task/Task";
// import SelectedFilter from "@/Components/SelectedFilter/SelectedFilter";
// import Answer from "@/Components/Answer/answer";
// import Progress from "@/Components/Progress/progress";
// import Dropdown from "@/Components/Dropdown/Dropdown";
// import CheckboxBtn from "@/Components/CheckboxBtn/CheckboxBtn";
// import DatePickerNative from "@/Components/Calendar/DatePickerNative";
// import ResponsibleEmployee from "@/Components/ResponsibleEmployee/ResponsibleEmployee";
// import EmployeeName from "@/Components/ResponsibleEmployee/ResponsibleEmployee";
// import MainComponent from "@/Components/ResponsibleEmployee/ResponsibleEmployee";
// import PriorityDropdown from "@/Components/PriorityDropdown/PriorityDropdown";
// import StatusDropdown from "@/Components/StatusDropdown/StatusDropdown";
// import UploadPhoto from "@/Components/UploadPhoto/UploadPhoto";
import DropdownList from "@/Components/Dropdown/Dropdown";
import Progress from "@/Components/Progress/progress";
import SelectedFilter from "@/Components/SelectedFilter/SelectedFilter";

export default function Home() {
  return (
    <div className={styles.page}>
      <p className={styles.h1}>დავალებების გვერდი</p>
      <div className={styles.dropdownList}>
        <DropdownList />
      </div>
      <div className={styles.selectedFilter}>
        <SelectedFilter name="გიოლა" />
      </div>
      <div className={styles.progressGroup}>
        <Progress text="დასაწყები" />
        <Progress text="პროგრესში" />
        <Progress text="მზად ტესტირებისთვის" />
        <Progress text="დასრულებული" />
      </div>
    </div>
  );
}
