import React, { useEffect, useState } from "react";
import styles from "./progress.module.css";
import Task from "../Task/Task";
import { API_URL, API_TOKEN } from "../../config/config";  // Import API config

type Props = {
  text: "დასაწყები" | "პროგრესში" | "მზად ტესტირებისთვის" | "დასრულებული";
};

// Helper function to return status-specific color and class
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
  
  const [tasks, setTasks] = useState<any[]>([]); // State to store tasks

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Filter tasks based on status name
  const filteredTasks = tasks.filter((task) => task.status?.name === props.text);

  return (
    <div className={styles.container}>
      <div className={`${styles.top} ${className}`}>{props.text}</div>

      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            borderColor={color}
            comments={8}
            date={task.due_date}
            title={task.name}
            description={task.description}
          />
        ))
      ) : (
        <p>No tasks available for this status.</p>
      )}
    </div>
  );
};

export default Progress;
