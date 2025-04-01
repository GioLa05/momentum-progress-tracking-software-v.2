"use client";

import React from "react";
import styles from "./DropdownContent.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";
import CheckboxBtn from "../CheckboxBtn/CheckboxBtn";

type Props = {
  options?: any[];
  selected: any;
  onSelect: (value: any) => void;
  onChoose: () => void;
};

const DropdownContent = ({ options = [], selected, onSelect, onChoose }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        {options.map((option, index) => {
          const isObject = typeof option === "object";
          const label = isObject ? `${option.name} ${option.surname}` : option;
          const avatar = isObject ? option.avatar : undefined;
          const isChecked = isObject
            ? selected?.id === option.id
            : selected === option;

          return (
            <CheckboxBtn
              key={index}
              label={label}
              avatar={avatar}
              isChecked={isChecked}
              onClick={() => {
                console.log("👉 Selected in UI:", option);
                onSelect(option);
              }}
            />
          );
        })}
      </div>
      <div className={styles.bottom}>
        <LargePrimaryButton text="არჩევა" onClick={onChoose} />
      </div>
    </div>
  );
};

export default DropdownContent;
