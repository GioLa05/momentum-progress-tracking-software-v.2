'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Name.module.css';

export default function NameForm() {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'მინიმუმ 2 სიმბოლო')
        .max(255, 'მაქსიმუმ 255 სიმბოლო')
        .required('სახელი სავალდებულოა'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const nameLength = formik.values.name.length;
  const isMinValid = nameLength >= 2;
  const isMaxValid = nameLength <= 255;
  const touched = formik.touched.name;

  const getClass = (valid: boolean) => {
    if (!touched) return styles.gray;
    return valid ? styles.green : styles.red;
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <p className={styles.mainP}>
        სახელი*
      </p>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        className={`${styles.input} ${
          touched && formik.errors.name
            ? styles.inputError
            : touched
            ? styles.inputSuccess
            : ''
        }`}
        placeholder=""
      />

      <div className={styles.requirements}>
        <p className={`${styles.requirement} ${getClass(isMinValid)}`}>
          მინიმუმ 2 სიმბოლო
        </p>
        <p className={`${styles.requirement} ${getClass(isMaxValid)}`}>
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
    </form>
  );
}
