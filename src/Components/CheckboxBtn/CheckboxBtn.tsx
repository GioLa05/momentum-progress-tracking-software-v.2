import React from "react";
import styles from "./CheckboxBtn.module.css";
import Checkbox from "@/icons/Checkbox";
import Image from "next/image";

type Props = {
  imageSrc?: string;
  label: string;
  isChecked?: boolean; // optional visual
  onClick?: () => void; // ✅ added
};

const CheckboxBtn = ({ imageSrc, label, isChecked, onClick }: Props) => {
  return (
    <div className={styles.button} onClick={onClick}> {/* ✅ handle click */}
      <Checkbox checked={isChecked} />
      {imageSrc && <Image src={imageSrc} width={28} height={28} alt="icon" />}
      <p>{label}</p>
    </div>
  );
};

export default CheckboxBtn;
