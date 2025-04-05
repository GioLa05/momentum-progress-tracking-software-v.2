// pages/Home.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import DropdownList from "@/Components/Dropdown/Dropdown";
import Progress from "@/Components/Progress/progress";
import { API_URL, API_TOKEN } from "@/config/config";
import { useEmployeeContext } from "@/app/api/employee-context/EmployeeContext";

export default function Home() {
  const [filters, setFilters] = useState({
    department: null,
    priority: null,
    employee: null,
  });

  const [tasks, setTasks] = useState<any[]>([]);
  const { refreshTrigger } = useEmployeeContext();

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });
      const data = await response.json();
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
    const result = tasks.filter((task) => {
      const matchDepartment = filters.department
        ? task.department.name.trim().toLowerCase() === filters.department.trim().toLowerCase()
        : true;

      const matchPriority = filters.priority
        ? task.priority.name.trim().toLowerCase() === filters.priority.trim().toLowerCase()
        : true;

      const matchEmployee = filters.employee
        ? task.employee.id === filters.employee.id
        : true;

      return matchDepartment && matchPriority && matchEmployee;
    });

    return result;
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
