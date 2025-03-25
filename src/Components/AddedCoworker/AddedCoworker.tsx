import React from "react";
import styles from "./AddedCoworker.module.css";
import Image from "next/image";

type Props = {};

const AddedCoworker = (props: Props) => {
  return (
    <button className={styles.button}>
      <Image src="/Coworker.png" alt="PlusButton" width={18} height={18}/>
      <p>თამარ კვანტალია</p>
    </button>
  );
};

export default AddedCoworker;
