import React from "react";
import styles from "./DropdownContent.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";
import CheckboxBtn from "../CheckboxBtn/CheckboxBtn";

type Props = {
  options?: string[]; // options შეიძლება იყოს undefined
};

const DropdownContent = ({ options = [] }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        {options.map((option, index) => (
          <CheckboxBtn key={index} label={option} />
        ))}
      </div>
      <div className={styles.bottom}>
        <LargePrimaryButton text="არჩევა" />
      </div>
    </div>
  );
};

export default DropdownContent;
