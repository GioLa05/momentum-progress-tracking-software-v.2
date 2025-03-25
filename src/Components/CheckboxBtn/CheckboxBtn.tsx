import React from "react";
import styles from "./CheckboxBtn.module.css";
import Checkbox from "@/icons/Checkbox";
import Image from "next/image";

type Props = {
  imageSrc?: string;
  label: string;
};

const CheckboxBtn = ({ imageSrc, label }: Props) => {
  return (
    <div className={styles.button}>
      <Checkbox />
      {imageSrc && <Image src={imageSrc} width={28} height={28} alt="icon" />}
      <p>{label}</p>
    </div>
  );
};

export default CheckboxBtn;
