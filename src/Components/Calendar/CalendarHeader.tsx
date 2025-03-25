import React from "react";
import styles from "./DatePickerNative.module.css";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
}) => {
  // Format the month and year
  const formatMonthYear = (date: Date) => {
    // Using Georgian month name and year as shown in the design
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

    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  };

  return (
    <div className={styles.actionBar}>
      <div className={styles.month}>
        <div className={styles.dcembre2023}>{formatMonthYear(currentDate)}</div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1fba4a030e71f570da9b4f8420183f2c45a03ce?placeholderIfAbsent=true&apiKey=011aa12674cd451797741460757d5bf4"
          className={styles.img}
          alt="Calendar icon"
        />
      </div>
      <div className={styles.arrows}>
        <button onClick={onPrevMonth} aria-label="Previous month">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/588e0df6c75ad7fc1db25febc21878507380346f?placeholderIfAbsent=true&apiKey=011aa12674cd451797741460757d5bf4"
            className={styles.img2}
            alt="Previous"
          />
        </button>
        <button onClick={onNextMonth} aria-label="Next month">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/12594160453c9e10e88cc44794668682ac279974?placeholderIfAbsent=true&apiKey=011aa12674cd451797741460757d5bf4"
            className={styles.img3}
            alt="Next"
          />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
