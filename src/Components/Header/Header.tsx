"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreateAnEmployee from "../CreateAnEmployee/createAnEmployee";
import CreateNewTask from "../CreateNewTask/CreateNewTask";
import AddCoworkerContent from "../AddCoworkerContent/AddCoworkerContent";
import { useEmployeeContext } from "@/app/api/employee-context/EmployeeContext";

const Header = () => {
  const [showAddCoworkerContent, setShowAddCoworkerContent] = useState(false);
  const { refreshEmployees } = useEmployeeContext();
  const router = useRouter();

  const handleCreateEmployeeClick = () => {
    setShowAddCoworkerContent(true);
  };

  const closeAddCoworkerContent = () => {
    setShowAddCoworkerContent(false);
  };

  const handleCreateNewTaskClick = () => {
    router.push("/newTaskPage");
  };

  return (
    <div className={styles.container}>
      {showAddCoworkerContent && (
        <AddCoworkerContent
          close={closeAddCoworkerContent}
          onEmployeeAdded={refreshEmployees}
        />
      )}
      <Link href="/">
        <Image src={"/Logo.png"} width={210} height={38} alt="logo" priority />
      </Link>
      <div className={styles.headerButtons}>
        <CreateAnEmployee
          text="თანამშრომლის შექმნა"
          onClick={handleCreateEmployeeClick}
        />
        <CreateNewTask
          showImage={true}
          text="შექმენი ახალი დავალება"
          onClick={handleCreateNewTaskClick}
        />
      </div>
    </div>
  );
};

export default Header;
