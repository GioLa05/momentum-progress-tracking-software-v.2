"use client";

import React from "react";
import styles from "./DropdownContent.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";
import CheckboxBtn from "../CheckboxBtn/CheckboxBtn";

type Option = {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
};

type Props = {
  options: Option[];
  selected: Option | null;
  onSelect: (value: Option) => void;
  onChoose: () => void;
};

const DropdownContent = ({ options, selected, onSelect, onChoose }: Props) => {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        {options.map((option) => {
          const isChecked = selected?.id === option.id;
          const label = option.surname
            ? `${option.name} ${option.surname}`
            : option.name;

          return (
            <CheckboxBtn
              key={option.id}
              label={label}
              imageSrc={option.avatar}
              isChecked={isChecked}
              onClick={() => onSelect(option)}
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
