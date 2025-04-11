"use client";

import { useState } from "react";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import styles from "./StatusDropdownClient.module.css";
import Image from "next/image";

// ✅ ტიპი სტატუსისთვის
type StatusType = {
  id: number;
  name: string;
};

export default function StatusDropdownClient({ status }: { status: StatusType }) {
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
