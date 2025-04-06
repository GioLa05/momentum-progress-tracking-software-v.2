// Components/TaskStatusDropdown.tsx
"use client";

import { useState } from "react";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import styles from "./TaskStatusDropdown.module.css";
import Image from "next/image";

type Props = {
  status: { id: number; name: string };
  taskId: number;
};

export default function TaskStatusDropdown({ status, taskId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.taskDetails} ${
        isOpen ? styles.alignTop : styles.alignCenter
      }`}
    >
      <div className={styles.detailsRight}>
        <Image src="/status.svg" width={24} height={24} alt="status" />
        <p>სტატუსი</p>
      </div>
      <StatusButtonWrapper
        taskStatus={{ ...status, taskId }} // ✅ pass taskId here
        onOpenChange={setIsOpen}
      />
    </div>
  );
}
