"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import DropdownList from "@/Components/Dropdown/Dropdown";
import Progress from "@/Components/Progress/progress";
import { API_URL, API_TOKEN } from "@/config/config";
import { useEmployeeContext } from "@/app/api/employee-context/EmployeeContext";

// ✅ Task ტიპის აღწერა
type Task = {
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
  };
  department: {
    id: number;
    name: string;
  };
  total_comments?: number;
};

export default function Home() {
  const [filters, setFilters] = useState({
    department: [] as string[],
    priority: [] as string[],
    employee: null as { id: number } | null,
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const { refreshTrigger } = useEmployeeContext();

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const data: Task[] = await response.json();
      setTasks(data);
      console.log("📦 All tasks loaded:", data.length);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    console.log("🏁 Home.tsx useEffect triggered! refreshTrigger =", refreshTrigger);
    fetchTasks();
  }, [refreshTrigger]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchDepartment =
        filters.department.length > 0
          ? filters.department.includes(task.department.name)
          : true;

      const matchPriority =
        filters.priority.length > 0
          ? filters.priority.includes(task.priority.name)
          : true;

      const matchEmployee = filters.employee
        ? task.employee.id === filters.employee.id
        : true;

      return matchDepartment && matchPriority && matchEmployee;
    });
  }, [filters, tasks]);

  return (
    <div className={styles.page}>
      <p className={styles.h1}>დავალებების გვერდი</p>

      <div className={styles.dropdownList}>
        <DropdownList
          onFilter={(filters) => {
            console.log("🎯 Filter selected from dropdown:", filters);
            setFilters({ ...filters });
          }}
        />
      </div>

      <div className={styles.progressGroup}>
        {["დასაწყები", "პროგრესში", "მზად ტესტირებისთვის", "დასრულებული"].map(
          (status) => (
            <Progress key={status} text={status} tasks={filteredTasks} />
          )
        )}
      </div>
    </div>
  );
}
