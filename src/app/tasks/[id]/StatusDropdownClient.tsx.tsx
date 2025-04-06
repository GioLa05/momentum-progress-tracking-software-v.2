// app/tasks/[id]/StatusDropdownClient.tsx
"use client";

import { useState } from "react";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import styles from "./page.module.css";
import Image from "next/image";

export default function StatusDropdownClient({ status }: { status: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.taskDetailsWrapper} ${!isOpen ? styles.centerContainer : ""}`}>
      <div className={styles.taskDetails}>
        <div className={styles.detailsRight}>
          <Image src={"/status.svg"} width={24} height={24} alt="status" />
          <p>სტატუსი</p>
        </div>
        <StatusButtonWrapper taskStatus={status} onOpenChange={setIsOpen} />
      </div>
    </div>
  );
}
