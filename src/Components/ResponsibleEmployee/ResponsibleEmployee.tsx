import React from "react";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import styles from "./ResponsibleEmployee.module.css";

type Props = {
  placeholder: string;
  type: string;
  iconSrc: string;
  disabled?: boolean;
  label: string;
};

const EmployeeName = ({
  placeholder,
  type,
  iconSrc,
  disabled = false,
  label,
}: Props) => {
  return (
    <div className={`${styles.main} ${disabled ? styles.disabled : ""}`}>
      <p className={`${styles.header} ${disabled ? styles.disabledText : ""}`}>
        {label}
      </p>
      <InputWithIcon
        placeholder={placeholder}
        type={type}
        iconSrc={iconSrc}
        disabled={disabled}
      />
      <div className={styles.bottomText}>
        <p className={styles.characterLimitText}>მინიმუმ 2 სიმბოლო</p>
        <p className={styles.characterLimitText}>მაქსიმუმ 255 სიმბოლო</p>
      </div>
    </div>
  );
};

const ResponsibleEmployee = ({
  placeholder,
  type,
  iconSrc,
  disabled = false,
  label,
}: Props) => {
  return (
    <div className={`${styles.main} ${disabled ? styles.disabled : ""}`}>
      <p className={`${styles.header} ${disabled ? styles.disabledText : ""}`}>
        {label}
      </p>
      <InputWithIcon
        placeholder={placeholder}
        type={type}
        iconSrc={iconSrc}
        disabled={disabled}
      />
      <div className={styles.bottomText}>
        <p className={styles.characterLimitText}>მინიმუმ 2 სიმბოლო</p>
        <p className={styles.characterLimitText}>მაქსიმუმ 255 სიმბოლო</p>
      </div>
    </div>
  );
};

const MainComponent = ({ placeholder, type, iconSrc, disabled }: Props) => {
  const labelText =
    type === "name"
      ? "სახელი*"
      : type === "surname"
      ? "გვარი*"
      : type === "responsible"
      ? "პასუხისმგებელი თანამშრომელი*"
      : "დეპარტამენტი";

  return (
    <div>
      {type === "employee" ? (
        <EmployeeName
          placeholder={placeholder}
          type={type}
          iconSrc={iconSrc}
          disabled={disabled}
          label={labelText}
        />
      ) : (
        <ResponsibleEmployee
          placeholder={placeholder}
          type={type}
          iconSrc={iconSrc}
          disabled={disabled}
          label={labelText}
        />
      )}
    </div>
  );
};

export default MainComponent;
