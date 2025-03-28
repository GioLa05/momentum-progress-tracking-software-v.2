import React, { useState } from "react";
import styles from "./PriorityDropdown.module.css";
import Image from "next/image";

type Props = {};

const PriorityDropdown = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={`${styles.dropdownContainer} ${isOpen ? styles.openBorder : ""}`}
    >
      <div className={styles.dropdown}>
        <Image src={"/Medium.svg"} width={16} height={18} alt="medium" />
        <p>საშუალო</p>

        <svg
          width="14"
          height="15"
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${styles.inputIcon} ${isOpen ? styles.openIcon : ""}`}
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
      </div>

      {isOpen && (
        <div className={styles.dropdownContent}>
          <div className={styles.option}>
            <Image src={"/Low.svg"} width={16} height={18} alt="low" />
            <p>დაბალი</p>
          </div>
          <div className={styles.option}>
            <Image src={"/Medium.svg"} width={16} height={18} alt="medium" />
            <p>საშუალო</p>
          </div>
          <div className={styles.option}>
            <Image src={"/High.svg"} width={16} height={18} alt="high" />
            <p>მაღალი</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriorityDropdown;
