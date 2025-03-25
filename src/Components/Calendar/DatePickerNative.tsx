"use client";

import * as React from "react";
import { useState } from "react";
import styles from "./DatePickerNative.module.css";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarActions from "./CalendarActions";

const DatePickerNative: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 14)); // January 14, 2025

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log("Cancel clicked");
  };

  const handleOk = () => {
    // Handle OK action
    console.log("OK clicked", selectedDate);
  };

  return (
    <div className={styles.datePickerNative}>
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid
        currentDate={currentDate}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
      <CalendarActions onCancel={handleCancel} onOk={handleOk} />
    </div>
  );
};

export default DatePickerNative;
