// Components/StatusWrapperClient.tsx
"use client";

import { useState } from "react";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import styles from "./page.module.css";

type Props = {
  taskStatus: { id: number; name: string };
  taskId: number;
};

export default function StatusWrapperClient({ taskStatus, taskId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`${styles.taskDetailsWrapper} ${
        !isOpen ? styles.centerContainer : ""
      }`}
    >
      <div className={styles.taskDetails}>
        <div className={styles.detailsRight}>
          <img src="/status.svg" width={24} height={24} alt="status" />
          <p>სტატუსი</p>
        </div>
        <StatusButtonWrapper
          taskStatus={{ ...taskStatus, taskId }} // ✅ Add taskId
          onOpenChange={setIsOpen}
        />
      </div>
    </div>
  );
}
