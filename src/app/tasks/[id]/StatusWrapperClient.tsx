// app/tasks/[id]/StatusWrapperClient.tsx (or move to a shared components folder)
"use client";

import { useState } from "react";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import styles from "./page.module.css";

export default function StatusWrapperClient({ taskStatus }: { taskStatus: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.taskDetailsWrapper} ${!isOpen ? styles.centerContainer : ""}`}>
      <div className={styles.taskDetails}>
        <div className={styles.detailsRight}>
          <img src="/status.svg" width={24} height={24} alt="status" />
          <p>სტატუსი</p>
        </div>
        <StatusButtonWrapper taskStatus={taskStatus} onOpenChange={setIsOpen} />
      </div>
    </div>
  );
}
