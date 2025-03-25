"use client";

import React, { useState } from "react";

const Checkbox = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={22}
      fill="none"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <rect
        width={20.5}
        height={20.5}
        x={0.75}
        y={0.75}
        stroke={isChecked ? "#8338EC" : "#212529"}
        strokeWidth={1.5}
        rx={5.25}
      />
      {isChecked && (
        <path
          stroke="#8338EC"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16.333 7.333 9 14.667l-3.333-3.334"
        />
      )}
    </svg>
  );
};

export default Checkbox;
