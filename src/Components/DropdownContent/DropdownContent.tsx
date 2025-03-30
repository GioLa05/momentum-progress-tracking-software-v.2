import React from "react";
import styles from "./DropdownContent.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";
import CheckboxBtn from "../CheckboxBtn/CheckboxBtn";

type Props = {
  options?: any[];
  selected: string | null | any;
  onSelect: (value: any) => void;
};

const DropdownContent = ({ options = [], selected, onSelect }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        {options.map((option, index) => (
          <CheckboxBtn
            key={index}
            label={typeof option === "string" ? option : `${option.name} ${option.surname}`} // Render string for departments/priorities, and name/surname for employees
            avatar={typeof option !== "string" ? option.avatar : undefined} // Only pass avatar if it's an employee object
            isChecked={selected === option} // Check if this option is selected
            onClick={() => onSelect(option)} // Set selected value
          />
        ))}
      </div>
      <div className={styles.bottom}>
        <LargePrimaryButton text="არჩევა" />
      </div>
    </div>
  );
};

export default DropdownContent;
