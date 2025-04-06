"use client";

import { useState } from "react";
import StatusButtonStyled from "@/Components/StatusButton/statusButton";
import { API_URL, API_TOKEN } from "@/config/config";
import { useEmployeeContext } from "@/app/api/employee-context/EmployeeContext";

export type Status = {
  id: number;
  name: string;
  taskId?: number; // ✅ Add taskId for PUT request
};

type Props = {
  taskStatus: Status;
  onOpenChange?: (isOpen: boolean) => void;
};

const StatusButtonWrapper = ({ taskStatus, onOpenChange }: Props) => {
  const { refreshEmployees } = useEmployeeContext();
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(taskStatus);
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const updateStatusOnServer = async (newStatus: Status) => {
    try {
      const taskId = taskStatus.taskId;
      if (!taskId) {
        console.error("❌ Missing taskId for status update");
        return;
      }

      const res = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ status_id: newStatus.id }),
      });

      if (res.ok) {
        setSelectedStatus(newStatus);
        refreshEmployees(); // ✅ Refresh task list in Home.tsx
        console.log("✅ Status updated and triggered refresh");
      } else {
        console.error("❌ Failed to update task status");
      }
    } catch (err) {
      console.error("❌ Error updating task status:", err);
    }
  };

  return (
    <div onClick={handleDropdownToggle}>
      <StatusButtonStyled
        defaultValue={selectedStatus}
        showLabel={false}
        formik={{
          setFieldValue: (_: string, value: number) => {
            const newStatus = { id: value, name: getStatusNameById(value), taskId: taskStatus.taskId };
            updateStatusOnServer(newStatus);
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
