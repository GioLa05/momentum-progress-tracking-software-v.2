import React, { useState } from "react";
import styles from "./InputWithIcon.module.css";
import AddedCoworker from "../AddedCoworker/AddedCoworker";
import AddCoworker from "../AddCoworker/AddCoworker";

type InputProps = {
  placeholder: string;
  type: string;
  disabled?: boolean;
  size?: "small" | "big"; // New prop to control input size
};

const InputWithIcon = ({ placeholder, type, disabled = false, size = "big" }: InputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Conditional width based on `size`
  const inputWidth = size === "small" ? "384px" : "550px"; // Adjust width based on size prop

  return (
    <div
      className={`${styles.groupedContainer} ${
        isOpen ? styles.openGroupedContainer : styles.closedGroupedContainer
      } ${size === "small" ? styles.smallWidth : ""}`}
      style={isOpen ? { overflow: "hidden" } : {}}
    >
      <div className={styles.inputContainer}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${styles.inputField} ${disabled ? styles.disabledInput : ""}`}
          disabled={disabled}
          style={{ width: inputWidth }} // Apply conditional width here
        />
        {type !== "name" && type !== "surname" && (
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${styles.inputIcon} ${isOpen ? styles.openIcon : ""} ${
              disabled ? styles.disabledIcon : ""
            }`}
            onClick={toggleDropdown}
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
        )}
      </div>
      {isOpen && (
        <>
          <AddCoworker />
          <AddedCoworker type="employee" name="ნატალია გიორგაძე" />
          <AddedCoworker type="employee" name="გიო ლა" />
        </>
      )}
    </div>
  );
};

export default InputWithIcon;
