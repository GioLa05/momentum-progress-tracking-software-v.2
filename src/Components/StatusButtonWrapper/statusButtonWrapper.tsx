"use client";

import { useState } from "react";
import StatusButtonStyled from "@/Components/StatusButton/statusButton";

export type Status = {
  id: number;
  name: string;
};

type Props = {
  taskStatus: Status;
  onOpenChange?: (isOpen: boolean) => void; // 👈 new prop
};

const StatusButtonWrapper = ({ taskStatus, onOpenChange }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(taskStatus);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState); // 👈 notify parent
  };

  return (
    <div onClick={handleDropdownToggle}>
      <StatusButtonStyled
        defaultValue={selectedStatus}
        showLabel={false}
        formik={{
          setFieldValue: (_: string, value: number) => {
            setSelectedStatus({ id: value, name: getStatusNameById(value) });
          },
        }}
      />
    </div>
  );
};

const getStatusNameById = (id: number): string => {
  switch (id) {
    case 1:
      return "დაგეგმილი";
    case 2:
      return "პროცესში";
    case 3:
      return "დასრულებული";
    default:
      return "უცნობი";
  }
};

export default StatusButtonWrapper;
