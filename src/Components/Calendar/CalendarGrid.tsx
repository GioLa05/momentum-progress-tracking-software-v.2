import React from "react";
import styles from "./DatePickerNative.module.css";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
}) => {
  // Get days for the calendar grid
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    // Get the day of the week (0-6, where 0 is Sunday)
    const day = new Date(year, month, 1).getDay();
    // Convert to Monday-based week (0-6, where 0 is Monday)
    return day === 0 ? 6 : day - 1;
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const calendarDays = [];

    // Previous month days
    for (let i = 0; i < firstDayOfMonth; i++) {
      const day = daysInPrevMonth - firstDayOfMonth + i + 1;
      calendarDays.push({
        day,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        month,
        year,
        isCurrentMonth: true,
      });
    }

    // Next month days
    const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
      });
    }

    return calendarDays;
  };

  const isSelectedDate = (day: number, month: number, year: number) => {
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year
    );
  };

  const handleDateClick = (day: number, month: number, year: number) => {
    onDateSelect(new Date(year, month, day));
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["L", "M", "M", "J", "V", "S", "D"];

  // Split the calendar days into weeks
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  return (
    <div className={styles.calendarList}>
      {/* Week days header */}
      <div className={styles.row}>
        {weekDays.map((day, index) => (
          <div key={`weekday-${index}`} className={styles.tile}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {weeks.map((week, weekIndex) => (
        <div
          key={`week-${weekIndex}`}
          className={
            weekIndex === 0 || weekIndex === 5 ? styles.row3 : styles.row
          }
        >
          {week.map((day, dayIndex) => {
            const isSelected = isSelectedDate(day.day, day.month, day.year);
            let tileClassName = styles.tile;

            if (day.isCurrentMonth) {
              if (isSelected) {
                tileClassName = styles.tile5;
              } else if (weekIndex === 1 && dayIndex >= 4) {
                // First week of current month (based on the design)
                tileClassName = styles.tile2;
              }
            } else {
              // Days from the previous or next month
              tileClassName = `${styles.tile} ${styles.tileDisabled}`;
            }

            return (
              <button
                key={`day-${weekIndex}-${dayIndex}`}
                className={tileClassName}
                onClick={() => handleDateClick(day.day, day.month, day.year)}
                aria-selected={isSelected}
                aria-label={`${day.day}/${day.month + 1}/${day.year}`}
              >
                {day.day}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
