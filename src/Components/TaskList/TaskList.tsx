import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import { API_URL, API_TOKEN } from "../../config/config";

// ტიპი თითოეული დავალებისთვის
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
  total_comments?: number;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]); // ✅ ტიპიზებული state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data: TaskType[] = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
