"use client";

import React, { useEffect, useState } from "react";
import styles from "./DepartmentDropdown.module.css";
import { API_URL, API_TOKEN } from "@/config/config";

type Department = {
  id: number;
  name: string;
};

type Props = {
  formik: any;
  width?: number;
  onSelect?: (departmentId: number) => void;
  dropdownClassName?: string; // 👈 optional custom class for height
};

const DepartmentDropdown = ({
  formik,
  width = 384,
  onSelect,
  dropdownClassName,
}: Props) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (department: Department) => {
    setSelectedDepartment(department);
    formik.setFieldValue("department_id", department.id);
    setIsOpen(false);
    onSelect?.(department.id);
  };

  useEffect(() => {
    if (isOpen) {
      const fetchDepartments = async () => {
        try {
          const res = await fetch(`${API_URL}/departments`, {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
          });
          if (!res.ok) throw new Error("Failed to fetch departments");
          const data = await res.json();
          setDepartments(data);
        } catch (error) {
          console.error("Error fetching departments:", error);
        }
      };
      fetchDepartments();
    }
  }, [isOpen]);

  return (
    <div className={styles.fullButton}>
      <span className={styles.label}>დეპარტამენტი*</span>
      <div
        className={`${styles.groupedContainer} ${
          isOpen ? styles.openGroupedContainer : styles.closedGroupedContainer
        }`}
        style={{ width }}
      >
        <div className={styles.inputContainer} onClick={toggleDropdown}>
          <div className={styles.inputField} style={{ width }}>
            <span className={styles.placeholder}>
              {selectedDepartment?.name || "აირჩიე დეპარტამენტი"}
            </span>
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
          <div className={`${styles.dropdownContent} ${dropdownClassName ? styles[dropdownClassName] : ""}`}>
            {departments.map((dept) => (
              <div
                key={dept.id}
                className={styles.departmentItem}
                onClick={() => handleSelect(dept)}
              >
                <span>{dept.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDropdown;
