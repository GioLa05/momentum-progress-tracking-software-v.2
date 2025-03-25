"use client";

import React, { useState } from "react";
import DropdownBtn from "@/Components/DropdownBtn/DropdownBtn";
import styles from "./Dropdown.module.css";

const dropdowns = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"] as const;

const DropdownList = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleDropdownClick = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.top}>
      {dropdowns.map((text, index) => (
        <DropdownBtn
          key={text}
          text={text}
          isActive={activeIndex === index}
          onClick={() => handleDropdownClick(index)}
        />
      ))}
    </div>
  );
};

export default DropdownList;
