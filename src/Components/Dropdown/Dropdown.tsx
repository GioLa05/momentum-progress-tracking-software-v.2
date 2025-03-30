"use client";

import React, { useState, useEffect } from "react";
import DropdownBtn from "@/Components/DropdownBtn/DropdownBtn";
import styles from "./Dropdown.module.css";
import DropdownContent from "../DropdownContent/DropdownContent";
import { API_URL, API_TOKEN } from "../../config/config"; // Assuming you have your API URL and Token in a config file

const DropdownList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // State to store the options for each dropdown
  const [departments, setDepartments] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [employees, setEmployees] = useState<any[]>([]); // State for employee data (with avatar, name, surname)

  // Fetch data for departments, priorities, and employees
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        // Fetch departments
        const departmentsResponse = await fetch(`${API_URL}/departments`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const departmentsData = await departmentsResponse.json();
        setDepartments(departmentsData.map((item: any) => item.name)); // Assuming 'name' contains the department name

        // Fetch priorities
        const prioritiesResponse = await fetch(`${API_URL}/priorities`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const prioritiesData = await prioritiesResponse.json();
        setPriorities(prioritiesData.map((item: any) => item.name)); // Assuming 'name' contains the priority name

        // Fetch employees (with avatar, name, and surname)
        const employeesResponse = await fetch(`${API_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const employeesData = await employeesResponse.json();
        setEmployees(employeesData); // Store the full employee objects
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    fetchDropdownData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleDropdownClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        {[
          { label: "დეპარტამენტი", options: departments },
          { label: "პრიორიტეტი", options: priorities },
          { label: "თანამშრომელი", options: employees },
        ].map((item, index) => (
          <DropdownBtn
            key={item.label}
            text={item.label}
            isActive={activeIndex === index}
            onClick={() => handleDropdownClick(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <DropdownContent
          options={
            activeIndex === 0
              ? departments
              : activeIndex === 1
              ? priorities
              : employees.map((employee: any) => ({
                  avatar: employee.avatar,
                  name: employee.name,
                  surname: employee.surname,
                }))
          }
        />
      )}
    </div>
  );
};

export default DropdownList;
