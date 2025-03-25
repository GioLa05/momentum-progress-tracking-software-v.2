import React from "react";
import styles from "./DatePickerNative.module.css";

interface CalendarActionsProps {
  onCancel: () => void;
  onOk: () => void;
}

const CalendarActions: React.FC<CalendarActionsProps> = ({
  onCancel,
  onOk,
}) => {
  return (
    <div className={styles.actionBar2}>
      <button className={styles.effacer} onClick={onCancel}>
        Cancel
      </button>
      <button className={styles.aujourdhui} onClick={onOk}>
        OK
      </button>
    </div>
  );
};

export default CalendarActions;
