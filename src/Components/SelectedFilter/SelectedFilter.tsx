import React from "react";
import styles from "./SelectedFilter.module.css";
import Image from "next/image";

type Props = {
  name: string;
};

const SelectedFilter = (props: Props) => {
  return (
    <button className={styles.button}>
      <p>{props.name}</p>
      <Image src={"x.svg"} width={14} height={14} alt="x" />
    </button>
  );
};

export default SelectedFilter;