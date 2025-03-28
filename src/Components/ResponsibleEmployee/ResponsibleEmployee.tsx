import React from "react";
import InputWithIcon from "../InputWithIcon/InputWithIcon";
import styles from "./ResponsibleEmployee.module.css";

type Props = {
  placeholder: string;
  type: string;
  iconSrc: string;
  disabled?: boolean;
  label: string;
  size?: "small" | "big"; // New prop to control size
  hideBottomText?: boolean; // New prop to hide bottom text
};

const EmployeeName = ({
  placeholder,
  type,
  iconSrc,
  disabled = false,
  label,
  size = "big", // Default size is "big"
  hideBottomText = false, // Default to false, meaning bottom text is shown
}: Props) => {
  return (
    <div className={`${styles.main} ${disabled ? styles.disabled : ""} ${size === "small" ? styles.smallWidth : ""}`}>
      <p className={`${styles.header} ${disabled ? styles.disabledText : ""}`}>
        {label}
      </p>
      <InputWithIcon
        placeholder={placeholder}
        type={type}
        iconSrc={iconSrc}
        disabled={disabled}
        size={size} // Pass size to InputWithIcon
      />
      {!hideBottomText && (
        <div className={styles.bottomText}>
          <p className={styles.characterLimitText}>მინიმუმ 2 სიმბოლო</p>
          <p className={styles.characterLimitText}>მაქსიმუმ 255 სიმბოლო</p>
        </div>
      )}
    </div>
  );
};

const ResponsibleEmployee = ({
  placeholder,
  type,
  iconSrc,
  disabled = false,
  label,
  size = "big", // Default size is "big"
  hideBottomText = false, // Default to false, meaning bottom text is shown
}: Props) => {
  return (
    <div className={`${styles.main} ${disabled ? styles.disabled : ""} ${size === "small" ? styles.smallWidth : ""}`}>
      <p className={`${styles.header} ${disabled ? styles.disabledText : ""}`}>
        {label}
      </p>
      <InputWithIcon
        placeholder={placeholder}
        type={type}
        iconSrc={iconSrc}
        disabled={disabled}
        size={size} // Pass size to InputWithIcon
      />
      {!hideBottomText && (
        <div className={styles.bottomText}>
          <p className={styles.characterLimitText}>მინიმუმ 2 სიმბოლო</p>
          <p className={styles.characterLimitText}>მაქსიმუმ 255 სიმბოლო</p>
        </div>
      )}
    </div>
  );
};

const MainComponent = ({
  placeholder,
  type,
  iconSrc,
  disabled,
  size,
  hideBottomText, // Add hideBottomText to MainComponent props
}: Props) => {
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
          size={size} // Pass size here
          hideBottomText={hideBottomText} // Pass hideBottomText here
        />
      ) : (
        <ResponsibleEmployee
          placeholder={placeholder}
          type={type}
          iconSrc={iconSrc}
          disabled={disabled}
          label={labelText}
          size={size} // Pass size here
          hideBottomText={hideBottomText} // Pass hideBottomText here
        />
      )}
    </div>
  );
};

export default MainComponent;
