"use client";

import styles from "./TaskNameInput.module.css";

type Props = {
  formik: any;
};

export function TaskNameInput({ formik }: Props) {
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
      <p className={styles.mainP}>სათაური*</p>
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
