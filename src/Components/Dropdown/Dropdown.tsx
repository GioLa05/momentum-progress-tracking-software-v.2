"use client";

import React, { useState } from "react";
import DropdownBtn from "@/Components/DropdownBtn/DropdownBtn";
import styles from "./Dropdown.module.css";
import DropdownContent from "../DropdownContent/DropdownContent";

const dropdowns = [
  {
    label: "დეპარტამენტი",
    options: ["დიზაინის დეპარტამენტი", "მარკეტინგის დეპარტამენტი"],
  },
  { label: "პრიორიტეტი", options: ["მაღალი პრიორიტეტი", "დაბალი პრიორიტეტი"] },
  { label: "თანამშრომელი", options: ["გიორგი", "ანა", "ლევანი"] },
];

const DropdownList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleDropdownClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.main}>
      <div className={styles.top}>
        {dropdowns.map((item, index) => (
          <DropdownBtn
            key={item.label}
            text={item.label}
            isActive={activeIndex === index}
            onClick={() => handleDropdownClick(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <DropdownContent options={dropdowns[activeIndex].options} />
      )}
    </div>
  );
};

export default DropdownList;
