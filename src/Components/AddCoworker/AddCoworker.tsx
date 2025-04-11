import React from "react";
import styles from "./AddCoworker.module.css";
import Image from "next/image";

const AddCoworker = () => {
  return (
    <button className={styles.button}>
      <Image src="/PlusBtn.svg" alt="PlusButton" width={18} height={18} />
      <p>დაამატე თანამშრომელი</p>
    </button>
  );
};

export default AddCoworker;
