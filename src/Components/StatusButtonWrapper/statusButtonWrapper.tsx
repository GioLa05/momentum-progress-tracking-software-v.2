// ✅ StatusButtonWrapper.tsx (Client Component)
"use client";

import { useState } from "react";
import StatusButton from "@/Components/StatusButton/statusButton";

// Status type definition
export type Status = {
  id: number;
  name: string;
};

// Props for wrapper
type Props = {
  taskStatus: Status;
};

const StatusButtonWrapper = ({ taskStatus }: Props) => {
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(taskStatus);

  return (
    <StatusButton
      label="სტატუსი*"
      defaultValue={selectedStatus}
      onSelectChange={(status) => {
        console.log("ახალი სტატუსი არჩეულია:", status);
        setSelectedStatus(status);
      }}
    />
  );
};

export default StatusButtonWrapper;
