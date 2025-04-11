"use client";

import React, { useState, useEffect } from "react";
import DropdownBtn from "@/Components/DropdownBtn/DropdownBtn";
import styles from "./Dropdown.module.css";
import DropdownContent from "../DropdownContent/DropdownContent";
import SelectedFilter from "@/Components/SelectedFilter/SelectedFilter";
import { API_URL, API_TOKEN } from "../../config/config";
import { useEmployeeContext } from "@/app/api/employee-context/EmployeeContext";

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

type Option = {
  id: number;
  name: string;
};

type Props = {
  onFilter: (filters: {
    department: string[];
    priority: string[];
    employee: { id: number } | null;
  }) => void;
};

const DropdownList = ({ onFilter }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);

  const { employees: allEmployees } = useEmployeeContext();

  const [appliedValues, setAppliedValues] = useState<{
    department: string[];
    priority: string[];
    employee: { id: number } | null;
  }>({
    department: [],
    priority: [],
    employee: null,
  });

  const [tempValues, setTempValues] = useState<{
    department: string[];
    priority: string[];
    employee: { id: number } | null;
  }>({
    department: [],
    priority: [],
    employee: null,
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const depRes = await fetch(`${API_URL}/departments`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const departmentsData: { id: number; name: string }[] = await depRes.json();
        setDepartments(departmentsData.map((d) => d.name));

        const priRes = await fetch(`${API_URL}/priorities`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const prioritiesData: { id: number; name: string }[] = await priRes.json();
        setPriorities(prioritiesData.map((p) => p.name));
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };

    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (tempValues.department.length > 0) {
      const filtered = allEmployees.filter((emp) =>
        tempValues.department.includes(emp.department?.name)
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(allEmployees);
    }
  }, [tempValues.department, allEmployees]);

  const handleChoose = () => {
    setAppliedValues(tempValues);
    onFilter({ ...tempValues });
    setActiveIndex(null);
  };

  const toggleValue = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter((v) => v !== value)
      : [...array, value];
  };

  const handleSelect = (value: Option | Employee) => {
    if (activeIndex === 0) {
      setTempValues((prev) => ({
        ...prev,
        department: toggleValue(prev.department, value.name),
        employee: null,
      }));
    } else if (activeIndex === 1) {
      setTempValues((prev) => ({
        ...prev,
        priority: toggleValue(prev.priority, value.name),
      }));
    } else if (activeIndex === 2 && "id" in value) {
      setTempValues((prev) => ({
        ...prev,
        employee: prev.employee?.id === value.id ? null : { id: value.id },
      }));
    }
  };

  const selected =
    activeIndex === 0
      ? tempValues.department.map((d, i) => ({ id: i, name: d }))
      : activeIndex === 1
      ? tempValues.priority.map((p, i) => ({ id: i, name: p }))
      : allEmployees.find((e) => e.id === tempValues.employee?.id) ?? null;

  const clearFilter = (key: "department" | "priority" | "employee") => {
    const updated = {
      ...appliedValues,
      [key]: key === "employee" ? null : [],
    };
    setAppliedValues(updated);
    setTempValues(updated);
    onFilter(updated);
  };

  const clearAll = () => {
    const cleared = {
      department: [],
      priority: [],
      employee: null,
    };
    setAppliedValues(cleared);
    setTempValues(cleared);
    onFilter(cleared);
  };

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        {["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"].map((label, index) => (
          <DropdownBtn
            key={label}
            text={label}
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(index === activeIndex ? null : index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <div className={styles.dropdownOverlay}>
          <DropdownContent
            options={
              activeIndex === 0
                ? departments.map((d, i) => ({ id: i, name: d }))
                : activeIndex === 1
                ? priorities.map((p, i) => ({ id: i, name: p }))
                : filteredEmployees.map((e) => ({
                    id: e.id,
                    name: e.name,
                    surname: e.surname,
                    avatar: e.avatar,
                  }))
            }
            selected={selected}
            onSelect={handleSelect}
            onChoose={handleChoose}
          />
        </div>
      )}

      <div className={styles.filters}>
        {appliedValues.department.map((dep) => (
          <SelectedFilter
            key={dep}
            name={dep}
            onClear={() => {
              const updated = appliedValues.department.filter((d) => d !== dep);
              const newState = { ...appliedValues, department: updated };
              setAppliedValues(newState);
              setTempValues(newState);
              onFilter(newState);
            }}
          />
        ))}

        {appliedValues.priority.map((pri) => (
          <SelectedFilter
            key={pri}
            name={pri}
            onClear={() => {
              const updated = appliedValues.priority.filter((p) => p !== pri);
              const newState = { ...appliedValues, priority: updated };
              setAppliedValues(newState);
              setTempValues(newState);
              onFilter(newState);
            }}
          />
        ))}

        {appliedValues.employee && (
          <SelectedFilter
            name={(() => {
              const match = allEmployees.find((e) => e.id === appliedValues.employee?.id);
              return match ? `${match.name} ${match.surname}` : "";
            })()}
            onClear={() => clearFilter("employee")}
          />
        )}

        {(appliedValues.department.length > 0 ||
          appliedValues.priority.length > 0 ||
          appliedValues.employee) && (
          <button className={styles.clearAll} onClick={clearAll}>
            გასუფთავება
          </button>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
