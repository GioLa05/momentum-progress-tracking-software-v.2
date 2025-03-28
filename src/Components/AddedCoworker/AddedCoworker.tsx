import React from "react";
import styles from "./AddedCoworker.module.css";
import Image from "next/image";

const departmentNames = [
  "დიზაინის დეპარტამენტი",
  "ლოჯისტიკის დეპარტამენტი",
  "მარკეტინგის დეპარტამენტი",
  "IT დეპარტამენტი",
  "გაყიდვების დეპარტამენტი",
];

const AddedCoworker = ({ type, name }: Props) => {
  const displayName =
    type === "department"
      ? departmentNames.includes(name || "")
        ? name
        : departmentNames[0] // თუ არასწორი სახელია, იღებს პირველ ელემენტს
      : name;

  return (
    <button className={styles.button}>
      {type === "employee" && (
        <Image src="/Coworker.png" alt="PlusButton" width={18} height={18} />
      )}
      <p>{displayName}</p>
    </button>
  );
};

export default AddedCoworker;
