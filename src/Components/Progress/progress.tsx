"use client";

import React, { useMemo } from "react";
import styles from "./progress.module.css";
import Task from "../Task/Task";

type Props = {
  text: "დასაწყები" | "პროგრესში" | "მზად ტესტირებისთვის" | "დასრულებული";
  tasks: TaskType[];
};

type TaskType = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: {
    id: number;
    name: string;
  };
  priority: {
    id: number;
    name: string;
    icon: string;
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
  department: {
    id: number;
    name: string;
  };
  total_comments?: number;
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

const Progress = ({ text, tasks }: Props) => {
  const { className, color } = getColorInfo(text);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.status?.name === text);
  }, [tasks, text]);

  return (
    <div className={styles.container}>
      <div className={`${styles.top} ${className}`}>{text}</div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            borderColor={color}
            comments={task.total_comments ?? 0}
          />
        ))
      ) : (
        <p>ამ სტატუსისთვის დავალება არ მოიძებნა.</p>
      )}
    </div>
  );
};

export default Progress;
