"use client";

import styles from "./TaskDescriptionInput.module.css";

type Props = {
  formik: any;
};

export function TaskDescriptionInput({ formik }: Props) {
  const length = formik.values.description.length;
  const isMinValid = length >= 2;
  const isMaxValid = length <= 1000;
  const touched = formik.touched.description;

  const getClass = (valid: boolean) => {
    if (!touched) return styles.gray;
    return valid ? styles.green : styles.red;
  };

  return (
    <div className={styles.formContainer}>
      <p className={styles.mainP}>აღწერა*</p>
      <textarea
        id="description"
        name="description"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        className={`${styles.input} ${
          touched && formik.errors.description ? styles.inputError : ""
        }`}
        rows={4}
      />
      <div className={styles.requirements}>
        <p className={`${styles.requirement} ${getClass(isMinValid)}`}>
          მინიმუმ 4 სიტყვა (თუ ჩაიწერა რაიმე)
        </p>
        <p className={`${styles.requirement} ${getClass(isMaxValid)}`}>
          მაქსიმუმ 255 სიმბოლო (თუ ჩაიწერა რაიმე)
        </p>
      </div>
    </div>
  );
}
