"use client";

import { useState } from "react";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import styles from "./TaskStatusDropdown.module.css";
import Image from "next/image";

export default function TaskStatusDropdown({ status }: { status: any }) {
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
      <StatusButtonWrapper taskStatus={status} onOpenChange={setIsOpen} />
    </div>
  );
}
