"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./page.module.css";
import DropdownList from "@/Components/Dropdown/Dropdown";
import Progress from "@/Components/Progress/progress";
import { API_URL, API_TOKEN } from "@/config/config";

export default function Home() {
  const [filters, setFilters] = useState({
    department: null,
    priority: null,
    employee: null,
  });

  const [tasks, setTasks] = useState<any[]>([]);

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
        console.log("📦 All tasks loaded:", data.length);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("📌 Filters changed:", filters);
  }, [filters]);

  const filteredTasks = useMemo(() => {
    const result = tasks.filter((task) => {
      const matchDepartment = filters.department
        ? task.department.name.trim().toLowerCase() ===
          filters.department.trim().toLowerCase()
        : true;

      const matchPriority = filters.priority
        ? task.priority.name.trim().toLowerCase() ===
          filters.priority.trim().toLowerCase()
        : true;

      const matchEmployee = filters.employee
        ? task.employee.id === filters.employee.id
        : true;

      if (filters.department) {
        console.log("🧪 Comparing task:", {
          taskDepartment: task.department.name,
          filterDepartment: filters.department,
          match:
            task.department.name.trim().toLowerCase() ===
            filters.department.trim().toLowerCase(),
        });
      }

      return matchDepartment && matchPriority && matchEmployee;
    });

    console.log("✅ Filtered tasks:", result.length);
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
          (status) => {
            console.log(
              "🧩 Sending to Progress:",
              status,
              filteredTasks.length
            );
            return (
              <Progress key={status} text={status} tasks={filteredTasks} />
            );
          }
        )}
      </div>
    </div>
  );
}
