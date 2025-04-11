import React, { useState } from "react";
import styles from "./StatusDropdown.module.css";

const StatusDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("დასაწყები");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (status: string) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdownContainer} ${isOpen ? styles.openBorder : ""}`}>
      <div className={styles.dropdown} onClick={toggleDropdown}>
        <p>{selectedStatus}</p>
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
          <div className={styles.option} onClick={() => handleOptionClick("დასაწყები")}>
            <p>დასაწყები</p>
          </div>
          <div className={styles.option} onClick={() => handleOptionClick("პროგრესში")}>
            <p>პროგრესში</p>
          </div>
          <div className={styles.option} onClick={() => handleOptionClick("მზად ტესტირებისთვის")}>
            <p>მზად ტესტირებისთვის</p>
          </div>
          <div className={styles.option} onClick={() => handleOptionClick("დასრულებული")}>
            <p>დასრულებული</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
