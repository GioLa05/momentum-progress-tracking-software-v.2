import React from "react";
import styles from "./CheckboxBtn.module.css";
import Checkbox from "@/icons/Checkbox";
import Image from "next/image";

type Props = {
  imageSrc?: string;
  label: string;
  isChecked?: boolean;
  onClick?: () => void;
};

const CheckboxBtn = ({ imageSrc, label, isChecked, onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <Checkbox checked={isChecked} />
      {imageSrc && (
        <Image
          src={imageSrc}
          width={28}
          height={28}
          alt="avatar"
          className={styles.avatar}
        />
      )}
      <p className={styles.label}>{label}</p>
    </div>
  );
};

export default CheckboxBtn;
