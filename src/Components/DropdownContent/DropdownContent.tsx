"use client";

import React, { useEffect, useState } from "react";
import styles from "./DropdownContent.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";
import CheckboxBtn from "../CheckboxBtn/CheckboxBtn";
import { API_URL, API_TOKEN } from "@/config/config";

type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
};

type Props = {
  selected: Employee | null;
  onSelect: (value: Employee) => void;
  onChoose: () => void;
};

const DropdownContent = ({ selected, onSelect, onChoose }: Props) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`${API_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("❌ Failed to fetch employees:", err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.top}>
        {employees.map((employee) => {
          const isChecked = selected?.id === employee.id;
          const label = `${employee.name} ${employee.surname}`;

          return (
            <CheckboxBtn
              key={employee.id}
              label={label}
              imageSrc={employee.avatar}
              isChecked={isChecked}
              onClick={() => onSelect(employee)}
            />
          );
        })}
      </div>
      <div className={styles.bottom}>
        <LargePrimaryButton text="არჩევა" onClick={onChoose} />
      </div>
    </div>
  );
};

export default DropdownContent;
