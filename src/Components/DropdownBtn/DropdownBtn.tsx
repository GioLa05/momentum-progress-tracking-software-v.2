"use client";

import React from "react";
import styles from "./DropdownBtn.module.css";
import DropdownIcon from "@/icons/DropdownIcon";

type Props = {
  text: "დეპარტამენტი" | "პრიორიტეტი" | "თანამშრომელი";
  isActive: boolean;
  onClick: () => void;
};

const DropdownBtn = ({ text, isActive, onClick }: Props) => {
  return (
    <div
      className={`${styles.container} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <span>{text}</span>
      <DropdownIcon isActive={isActive} />
    </div>
  );
};

export default DropdownBtn;
