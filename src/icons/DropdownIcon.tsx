import * as React from "react";

type Props = {
  isActive: boolean;
};

const DropdownIcon = ({ isActive }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    style={{
      transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.3s ease, fill 0.3s ease",
    }}
  >
    <path
      fill={isActive ? "#8338EC" : "#0D0F10"}
      d="M6.707 8.293a1 1 0 0 0-1.414 1.414l6 6a1 1 0 0 0 1.414 0l6-6a1 1 0 0 0-1.414-1.414L12 13.586 6.707 8.293Z"
    />
  </svg>
);

export default DropdownIcon;
