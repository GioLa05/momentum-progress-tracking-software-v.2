"use client";

import React from "react";
import styles from "./Comment.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";

const Comment = () => {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder="დააკომენტარე"
      />
      <div className={styles.buttonWrapper}>
        <LargePrimaryButton text="დააკომენტარე" onClick={() => console.log("დააკომენტარე")} />
      </div>
    </div>
  );
};

export default Comment;
