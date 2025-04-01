import React, { useEffect, useState } from "react";
import Task from "../Task/Task";
import { API_URL, API_TOKEN } from "../../config/config"; // Import the config for API URL and token

const TaskList = () => {
  const [tasks, setTasks] = useState<any[]>([]); // State to store tasks

  // Fetch tasks from the API when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`, // Use Bearer token for authorization
          },
        });
        const data = await response.json(); // Assuming the response contains an array of tasks
        setTasks(data); // Set the tasks state to the fetched data
      } catch (error) {
        console.error("Error fetching tasks:", error); // Error handling
      }
    };
    fetchTasks(); // Call the fetch function when the component mounts
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} /> // Pass each task as a prop to the Task component
      ))}
    </div>
  );
};

export default TaskList;
