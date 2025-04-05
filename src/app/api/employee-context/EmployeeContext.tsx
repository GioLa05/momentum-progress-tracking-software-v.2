// src/app/api/employee-context/EmployeeContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { API_TOKEN, API_URL } from "@/config/config";

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department_id: string;
};

type EmployeeContextType = {
  employees: Employee[];
  refreshEmployees: () => void;
  refreshTrigger: number;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(`${API_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          Accept: "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
        console.log("📦 Employees loaded:", data.length);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [refreshTrigger]); // Fetch again on refreshTrigger change

  const refreshEmployees = () => {
    setRefreshTrigger((prev) => prev + 1); // triggers fetch
  };

  return (
    <EmployeeContext.Provider value={{ employees, refreshEmployees, refreshTrigger }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployeeContext must be used within an EmployeeProvider");
  }
  return context;
};
