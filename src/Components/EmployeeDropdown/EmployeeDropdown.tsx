"use client";

import React, { useEffect, useState } from "react";
import styles from "./EmployeeDropdown.module.css";
import { API_URL, API_TOKEN } from "@/config/config";

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: {
    id: number;
    name: string;
  };
};

type Props = {
  formik: any;
  width?: number;
  selectedDepartmentId?: number | null;
};

const EmployeeDropdown = ({ formik, width = 384, selectedDepartmentId }: Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    formik.setFieldValue("employee_id", employee.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch employees");

        const data = await res.json();

        console.log("🔍 Employees from API:", data);
        console.log("📌 Selected department ID:", selectedDepartmentId);

        const filtered = selectedDepartmentId
          ? data.filter((emp: any) => emp.department?.id === selectedDepartmentId)
          : data;

        console.log("✅ Filtered employees:", filtered);

        setEmployees(filtered);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    if (isOpen) {
      fetchEmployees();
    }
  }, [isOpen, selectedDepartmentId]); // ✅ dependency array is stable

  return (
    <div className={styles.fullButton}>
      <span className={styles.label}>პასუხისმგებელი თანამშრომელი*</span>
      <div
        className={`${styles.groupedContainer} ${
          isOpen ? styles.openGroupedContainer : styles.closedGroupedContainer
        }`}
        style={{ width }}
      >
        <div className={styles.inputContainer} onClick={toggleDropdown}>
          <div className={styles.inputField} style={{ width }}>
            <span className={styles.placeholder}>
              {selectedEmployee
                ? `${selectedEmployee.name} ${selectedEmployee.surname}`
                : "აირჩიე თანამშრომელი"}
            </span>
            {selectedEmployee?.avatar && (
              <img
                src={selectedEmployee.avatar}
                alt="avatar"
                className={styles.avatarMini}
              />
            )}
          </div>
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.inputIcon} ${isOpen ? styles.openIcon : ""}`}
          >
            <path
              d="M11.6199 5.72084L7.81655 9.52417C7.36738 9.97334 6.63238 9.97334 6.18322 9.52417L2.37988 5.72084"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div className={styles.dropdownContent}>
            {employees.length === 0 ? (
              <div className={styles.emptyText}>ამ დეპარტამენტში თანამშრომლები არ მოიძებნა</div>
            ) : (
              employees.map((emp) => (
                <div
                  key={emp.id}
                  className={styles.item}
                  onClick={() => handleSelect(emp)}
                >
                  <img
                    src={emp.avatar}
                    alt={`${emp.name} ${emp.surname}`}
                    className={styles.avatar}
                  />
                  <span>{emp.name} {emp.surname}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDropdown;
