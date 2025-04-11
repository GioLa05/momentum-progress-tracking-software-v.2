"use client";

import styles from "./FullName.module.css";
import { FormikProps } from "formik";

// Define form fields type
type FormValues = {
  name: string;
  surname: string;
  priority_id: number | null;
  employee_id: number | null;
  department_id: number | null;
};

type Props = {
  formik: FormikProps<FormValues>;
};

export function NameInput({ formik }: Props) {
  const length = formik.values.name.length;
  const isMinValid = length >= 2;
  const isMaxValid = length <= 255;
  const touched = formik.touched.name;

  const getClass = (valid: boolean) => {
    if (!touched) return styles.gray;
    return valid ? styles.green : styles.red;
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.mainP}>სახელი*</p>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={`${styles.input} ${
          touched && formik.errors.name ? styles.inputError : ""
        }`}
      />
      <div className={styles.requirements}>
        <p className={`${styles.requirement} ${getClass(isMinValid)}`}>
          მინიმუმ 2 სიმბოლო
        </p>
        <p className={`${styles.requirement} ${getClass(isMaxValid)}`}>
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </div>
  );
}

export function SurnameInput({ formik }: Props) {
  const length = formik.values.surname.length;
  const isMinValid = length >= 2;
  const isMaxValid = length <= 255;
  const touched = formik.touched.surname;

  const getClass = (valid: boolean) => {
    if (!touched) return styles.gray;
    return valid ? styles.green : styles.red;
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.mainP}>გვარი*</p>
      <input
        id="surname"
        name="surname"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.surname}
        className={`${styles.input} ${
          touched && formik.errors.surname ? styles.inputError : ""
        }`}
      />
      <div className={styles.requirements}>
        <p className={`${styles.requirement} ${getClass(isMinValid)}`}>
          მინიმუმ 2 სიმბოლო
        </p>
        <p className={`${styles.requirement} ${getClass(isMaxValid)}`}>
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </div>
  );
}
