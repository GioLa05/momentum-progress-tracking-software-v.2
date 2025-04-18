"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./DatePicker.module.css";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarActions from "./CalendarActions";
import { FormikProps } from "formik";

// Reuse the same form values type
type FormValues = {
  name: string;
  description: string;
  priority_id: number | null;
  employee_id: number | null;
  department_id: number | null;
};

type Props = {
  formik: FormikProps<FormValues>; // ✅ Added
  width: number; // ✅ Added
  label: string; // ✅ Added
  placeholder: string; // ✅ Added
  onDateChange?: (date: Date | null) => void;
};

const DatePicker: React.FC<Props> = ({
  formik,
  width,
  label,
  placeholder,
  onDateChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 0, 1));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  const formatDate = (date: Date | null): string => {
    if (!date) return placeholder;
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatMonthYear = (date: Date): string => {
    const monthNames = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const generateDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let firstDayOfWeek = firstDay.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        isSelected: tempSelectedDate
          ? tempSelectedDate.getDate() === i &&
            tempSelectedDate.getMonth() === month &&
            tempSelectedDate.getFullYear() === year
          : false,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isSelected: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleSelectDate = (day: number) => {
    const newDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setTempSelectedDate(newDate);
  };

  const handleCancel = () => {
    setTempSelectedDate(selectedDate);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    setSelectedDate(tempSelectedDate);
    setIsOpen(false);
    if (onDateChange) {
      onDateChange(tempSelectedDate);
    }

    // Optional: set Formik field if needed (e.g., due_date)
    formik.setFieldValue("due_date", tempSelectedDate);
  };

  const toggleCalendar = () => {
    if (!isOpen) {
      setTempSelectedDate(selectedDate);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.datepicker} ref={datePickerRef}>
      <div className={styles.container} style={{ width }}>
        <label className={styles.label}>{label}</label>
        <div className={styles.inputWrapper}>
          <div
            className={`${styles.inputField} ${
              isOpen ? styles.inputFieldActive : ""
            }`}
            onClick={toggleCalendar}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/81d830de5498a12b064b9f33b671c56aca6aa591?placeholderIfAbsent=true&apiKey=4842f4b6cd0f4dd2874a8151479bb22a"
              className={styles.calendarIcon}
              alt="Calendar"
            />
            <div className={styles.inputContent}>
              {isOpen && !selectedDate && (
                <div className={`${styles.caret} ${styles.blinkingCaret}`} />
              )}
              <div
                className={`${styles.placeholder} ${
                  selectedDate ? styles.placeholderSelected : ""
                }`}
              >
                {formatDate(selectedDate)}
              </div>
            </div>
          </div>

          {isOpen && (
            <div className={styles.calendarDropdown}>
              <CalendarHeader
                currentMonth={formatMonthYear(currentMonth)}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
              />

              <CalendarGrid
                days={generateDays()}
                weekDays={weekDays}
                onSelectDate={handleSelectDate}
              />

              <CalendarActions
                onCancel={handleCancel}
                onConfirm={handleConfirm}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
