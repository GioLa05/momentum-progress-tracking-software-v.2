"use client";

import React from "react";
import styles from "./CreateNewTask.module.css";
import Image from "next/image";

type Props = {
  showImage?: boolean;
  text?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  width: number;
  variant?: "default" | "form";
};

const CreateNewTask = ({
  showImage = true,
  text = "შექმენი ახალი დავალება",
  onClick,
  type = "button",
  width,
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
