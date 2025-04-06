"use client";

import React from "react";
import styles from "./CreateNewTask.module.css";
import Image from "next/image";
import { FormikProps } from "formik";

// Form values shape
type FormValues = {
  name: string;
  description: string;
  priority_id: number | null;
  employee_id: number | null;
  department_id: number | null;
};

type Props = {
  showImage?: boolean;
  text?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  formik: FormikProps<FormValues>;
  width: number;
  label: string;
  placeholder: string;

  /** Variant to change style/behavior */
  variant?: "default" | "form";
};

const CreateNewTask = ({
  showImage = true,
  text = "შექმენი ახალი დავალება",
  onClick,
  type = "button",
  formik,
  width,
  label,
  placeholder,
  variant = "default",
}: Props) => {
  const buttonStyle: React.CSSProperties =
    variant === "form"
      ? {
          width: "208px",
          height: "42px",
        }
      : {
          width,
        };

  const buttonText = variant === "form" ? "დავალების შექმნა" : text;

  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      style={buttonStyle}
    >
      {variant !== "form" && showImage && (
        <Image src="/add.svg" alt="add icon" width={20} height={20} />
      )}
      <p>{buttonText}</p>
    </button>
  );
};

export default CreateNewTask;
