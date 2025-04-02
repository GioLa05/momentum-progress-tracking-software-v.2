"use client";

import React from "react";
import Link from "next/link";
import styles from "./Task.module.css";
import Level from "../Level/Level";
import RankButton from "../RankButton/RankButton";
import Image from "next/image";

// Define the TaskData type for the task object
type TaskData = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
    department: {
      id: number;
      name: string;
    };
  };
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
    icon: string;
  };
};

// Define the Props type for the Task component
type Props = {
  task: TaskData;
};

// Map Georgian priority names to levels
const getPriorityLevel = (name: string): string => {
  switch (name) {
    case "დაბალი":
      return "low";
    case "საშუალო":
      return "medium";
    case "მაღალი":
      return "high";
    default:
      return "low";
  }
};

// Georgian months mapping
const georgianMonths = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

// Department ID → color/text mapping for RankButton
const departmentStylesMap: Record<
  number,
  {
    text: string;
    color:
      | "pink"
      | "orange"
      | "blue"
      | "yellow"
      | "green"
      | "purple"
      | "red"
      | "teal";
  }
> = {
  1: { text: "ადმინისტრაცია", color: "teal" },
  2: { text: "ადამიანური რესურსები", color: "green" },
  3: { text: "ფინანსები", color: "purple" },
  4: { text: "მარკეტინგი", color: "orange" },
  5: { text: "ლოჯისტიკა", color: "yellow" },
  6: { text: "ინფ. ტექ.", color: "blue" },
  7: { text: "მედია", color: "red" },
  8: { text: "დიზაინი", color: "pink" },
};

// Task component
const Task = ({ task }: Props) => {
  const date = new Date(task.due_date);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  const georgianMonth = georgianMonths[monthIndex];
  const finalDate = `${day} ${georgianMonth} ${year}`;

  const departmentStyle = departmentStylesMap[task.department.id];

  return (
    <Link href={`/tasks/${task.id}`} className={styles.button}>
      {/* Top section: Priority level, department, and due date */}
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <Level priority={getPriorityLevel(task.priority.name)} size="small" />
          <RankButton
            color={departmentStyle.color}
            text={departmentStyle.text}
          />
        </div>
        <p>{finalDate}</p>
      </div>

      {/* Middle section: Task name and description */}
      <div className={styles.middle}>
        <p className={styles.h1}>{task.name}</p>
        <p className={styles.h2}>{task.description}</p>
      </div>

      {/* Bottom section: Employee avatar and comment count */}
      <div className={styles.bottom}>
        <Image
          className={styles.avatarContainer}
          src={task.employee.avatar}
          width={31}
          height={31}
          alt="coworker"
        />
        <div className={styles.bottomRight}>
          <Image src={"comment.svg"} width={22} height={22} alt="comment" />
          <p>0</p>
        </div>
      </div>
    </Link>
  );
};

export default Task;
