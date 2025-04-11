"use client";

import React, { useEffect, useState } from "react";
import styles from "./priorityButton.module.css";
import { API_URL, API_TOKEN } from "@/config/config";
import Image from "next/image";
import { FormikProps } from "formik";

// Priority type
type Priority = {
  id: number;
  name: string;
  icon: string;
};

// Form field structure
type FormValues = {
  name: string;
  description: string;
  priority_id: number | null;
  employee_id: number | null;
  department_id: number | null;
};

type Props = {
  formik: FormikProps<FormValues>;
};

const PriorityButton = ({ formik }: Props) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (priority: Priority) => {
    setSelectedPriority(priority);
    formik.setFieldValue("priority_id", priority.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      const fetchPriorities = async () => {
        try {
          const res = await fetch(`${API_URL}/priorities`, {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          });

          if (!res.ok) throw new Error("Failed to fetch priorities");

          const data: Priority[] = await res.json();
          setPriorities(data);
        } catch (error) {
          console.error("Error fetching priorities:", error);
        }
      };

      fetchPriorities();
    }
  }, [isOpen]);

  return (
    <div className={styles.fullButton}>
      <span className={styles.label}>პრიორიტეტი*</span>

      <div
        className={`${styles.groupedContainer} ${
          isOpen ? styles.openGroupedContainer : styles.closedGroupedContainer
        }`}
      >
        <div className={styles.inputContainer} onClick={toggleDropdown}>
          <div className={styles.inputField}>
            {selectedPriority?.icon && (
              <Image
                src={selectedPriority.icon}
                alt={selectedPriority.name}
                width={20}
                height={20}
                className={styles.icon}
              />
            )}
            <span className={styles.placeholder}>
              {selectedPriority?.name || "აირჩიე პრიორიტეტი"}
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
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {isOpen && (
          <div className={styles.dropdownContent}>
            {priorities.map((priority) => (
              <div
                key={priority.id}
                className={styles.priorityItem}
                onClick={() => handleSelect(priority)}
              >
                <Image
                  src={priority.icon}
                  alt={priority.name}
                  width={20}
                  height={20}
                  className={styles.icon}
                />
                <span>{priority.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriorityButton;
