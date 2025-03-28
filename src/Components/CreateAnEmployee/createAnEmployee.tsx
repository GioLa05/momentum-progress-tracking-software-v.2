import React from "react";
import styles from "./createAnEmployee.module.css";

const CreateAnEmployee = ({ text = "თანამშრომლის შექმნა", onClick }) => {
  return <button className={styles.button} onClick={onClick}>{text}</button>;
};

export default CreateAnEmployee;
