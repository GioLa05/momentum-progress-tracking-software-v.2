"use client";

import React, { useEffect, useState } from "react";
import styles from "./statusButton.module.css";
import { API_URL, API_TOKEN } from "@/config/config";
import { FormikProps } from "formik";

// ტიპი ფორმის ველებისთვის
type FormValues = {
  name: string;
  description: string;
  priority_id: number | null;
  employee_id: number | null;
  department_id: number | null;
  status_id: number | null;
};

type Status = {
  id: number;
  name: string;
};

type Props = {
  formik: FormikProps<FormValues>;
  showLabel?: boolean;
  defaultValue?: Status;
};

const StatusButtonStyled = ({ formik, showLabel = true, defaultValue }: Props) => {
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(defaultValue || null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (status: Status) => {
    setSelectedStatus(status);
    formik.setFieldValue("status_id", status.id);
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch(`${API_URL}/statuses`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch statuses");

        const data: Status[] = await res.json();
        setStatuses(data);

        if (!selectedStatus && defaultValue) {
          const match = data.find((s) => s.id === defaultValue.id);
          if (match) setSelectedStatus(match);
        }
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, [defaultValue, selectedStatus]); // ✅ დამატებულია ორივე დამოკიდებულება

  return (
    <div className={`${styles.fullButton} ${isOpen ? styles.openFullButton : ""}`}>
      {showLabel && <span className={styles.label}>სტატუსი*</span>}

      <div
        className={`${styles.groupedContainer} ${
          isOpen ? styles.openGroupedContainer : styles.closedGroupedContainer
        }`}
      >
        <div className={styles.inputContainer} onClick={toggleDropdown}>
          <div className={styles.inputField}>
            <span className={styles.placeholder}>
              {selectedStatus?.name || "აირჩიე სტატუსი"}
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
          <div className={styles.dropdownContent}>
            {statuses.map((status) => (
              <div
                key={status.id}
                className={styles.statusItem}
                onClick={() => handleSelect(status)}
              >
                {status.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusButtonStyled;
