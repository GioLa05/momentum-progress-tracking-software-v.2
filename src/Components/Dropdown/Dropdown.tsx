"use client";

import React, { useState, useEffect } from "react";
import DropdownBtn from "@/Components/DropdownBtn/DropdownBtn";
import styles from "./Dropdown.module.css";
import DropdownContent from "../DropdownContent/DropdownContent";
import SelectedFilter from "@/Components/SelectedFilter/SelectedFilter";
import { API_URL, API_TOKEN } from "../../config/config";
import { useEmployeeContext } from "@/app/api/employee-context/EmployeeContext";

const DropdownList = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [priorities, setPriorities] = useState<string[]>([]);
  const [allEmployees, setAllEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);

  const { refreshTrigger } = useEmployeeContext();

  const [appliedValues, setAppliedValues] = useState({
    department: null as string | null,
    priority: null as string | null,
    employee: null as { id: number } | null,
  });

  const [tempValues, setTempValues] = useState({
    department: null as string | null,
    priority: null as string | null,
    employee: null as { id: number } | null,
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const depRes = await fetch(`${API_URL}/departments`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const departmentsData = await depRes.json();
        setDepartments(departmentsData.map((d: any) => d.name));

        const priRes = await fetch(`${API_URL}/priorities`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const prioritiesData = await priRes.json();
        setPriorities(prioritiesData.map((p: any) => p.name));

        const empRes = await fetch(`${API_URL}/employees`, {
          headers: { Authorization: `Bearer ${API_TOKEN}` },
        });
        const employeesData = await empRes.json();
        setAllEmployees(employeesData);
        setFilteredEmployees(employeesData);
      } catch (err) {
        console.error("Dropdown fetch error:", err);
      }
    };

    fetchDropdownData();
  }, [refreshTrigger]);

  useEffect(() => {
    if (tempValues.department) {
      const filtered = allEmployees.filter(
        (emp) => emp.department?.name === tempValues.department
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

  const handleSelect = (value: any) => {
    if (activeIndex === 0) {
      setTempValues((prev) => ({
        ...prev,
        department: prev.department === value.name ? null : value.name,
        employee: null, // Clear employee when department changes
      }));
    } else if (activeIndex === 1) {
      setTempValues((prev) => ({
        ...prev,
        priority: prev.priority === value.name ? null : value.name,
      }));
    } else if (activeIndex === 2) {
      setTempValues((prev) => ({
        ...prev,
        employee: prev.employee?.id === value.id ? null : { id: value.id },
      }));
    }
  };

  const selected =
    activeIndex === 0
      ? tempValues.department
        ? { id: 0, name: tempValues.department }
        : null
      : activeIndex === 1
      ? tempValues.priority
        ? { id: 0, name: tempValues.priority }
        : null
      : allEmployees.find((e) => e.id === tempValues.employee?.id) ?? null;

  const clearFilter = (key: "department" | "priority" | "employee") => {
    const updated = { ...appliedValues, [key]: null };
    setAppliedValues(updated);
    setTempValues(updated);
    onFilter(updated);
  };

  const clearAll = () => {
    const cleared = {
      department: null,
      priority: null,
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
        {appliedValues.department && (
          <SelectedFilter
            name={appliedValues.department}
            onClear={() => clearFilter("department")}
          />
        )}
        {appliedValues.priority && (
          <SelectedFilter
            name={appliedValues.priority}
            onClear={() => clearFilter("priority")}
          />
        )}
        {appliedValues.employee && (
          <SelectedFilter
            name={(() => {
              const match = allEmployees.find((e) => e.id === appliedValues.employee?.id);
              return match ? `${match.name} ${match.surname}` : "";
            })()}
            onClear={() => clearFilter("employee")}
          />
        )}

        {(appliedValues.department || appliedValues.priority || appliedValues.employee) && (
          <button className={styles.clearAll} onClick={clearAll}>
            გასუფთავება
          </button>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
