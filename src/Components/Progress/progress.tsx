"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./progress.module.css";
import Task from "../Task/Task";
import { API_URL, API_TOKEN } from "@/config/config";

type Props = {
  text: "დასაწყები" | "პროგრესში" | "მზად ტესტირებისთვის" | "დასრულებული";
  tasks: any[];
};

const fetchCommentCount = async (taskId: number): Promise<number> => {
  try {
    const res = await fetch(`${API_URL}/tasks/${taskId}/comments`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return 0;

    const data = await res.json();
    return data.length;
  } catch (err) {
    console.error("Error fetching comment count:", err);
    return 0;
  }
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
  const [commentsCount, setCommentsCount] = useState<Record<number, number>>({});

  // ✅ Memoized filtered tasks — stable between renders
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => task.status?.name === text);
  }, [tasks, text]);

  // ✅ Runs only when filteredTasks change (once when data loads)
  useEffect(() => {
    if (filteredTasks.length === 0) return;

    const fetchAllComments = async () => {
      const counts: Record<number, number> = {};

      await Promise.all(
        filteredTasks.map(async (task) => {
          const count = await fetchCommentCount(task.id);
          counts[task.id] = count;
        })
      );

      setCommentsCount(counts);
    };

    fetchAllComments();
  }, [filteredTasks]);

  return (
    <div className={styles.container}>
      <div className={`${styles.top} ${className}`}>{text}</div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            borderColor={color}
            comments={commentsCount[task.id] ?? 0}
          />
        ))
      ) : (
        <p>ამ სტატუსისთვის დავალება არ მოიძებნა.</p>
      )}
    </div>
  );
};

export default Progress;
