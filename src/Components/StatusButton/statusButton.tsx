"use client";

import React, { useEffect, useState } from "react";
import styles from "./statusButton.module.css";
import DropdownIcon from "../../icons/DropdownIcon";
import { API_URL, API_TOKEN } from "@/config/config";

type Status = {
  id: number;
  name: string;
};

type Props = {
  label?: string;
  defaultValue?: Status; // optional, თუ გინდა დაარეკო შიგნიდან
  disabled?: boolean;
  onSelectChange?: (status: Status) => void; // optional callback
};

const StatusButton = ({
  label,
  defaultValue,
  disabled = false,
  onSelectChange,
}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(defaultValue || null);

  const toggleDropdown = () => {
    if (!disabled) setIsActive((prev) => !prev);
  };

  const handleStatusSelect = (status: Status) => {
    setSelectedStatus(status);
    setIsActive(false);
    onSelectChange?.(status); // optional callback to notify parent
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await fetch(`${API_URL}/statuses`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setStatuses(data);

        if (!selectedStatus && data.length > 0) {
          setSelectedStatus(data[0]);
          onSelectChange?.(data[0]); // notify parent if needed
        }
      } catch (error) {
        console.error("სტატუსების წამოღება ვერ მოხერხდა", error);
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.dropdownButton} ${disabled ? styles.disabledButton : ""}`}
        onClick={toggleDropdown}
        disabled={disabled}
      >
        <span>{selectedStatus?.name || "აირჩიე სტატუსი"}</span>
        <DropdownIcon isActive={isActive} />
      </button>

      {isActive && (
        <div className={styles.dropdownMenu}>
          {statuses.map((status) => (
            <div
              key={status.id}
              className={styles.dropdownItem}
              onClick={() => handleStatusSelect(status)}
            >
              {status.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusButton;
