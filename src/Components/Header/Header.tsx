"use client";

import React, { useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import CreateAnEmployee from "../CreateAnEmployee/createAnEmployee";
import CreateNewTask from "../CreateNewTask/CreateNewTask";
import AddCoworkerContent from "../AddCoworkerContent/AddCoworkerContent"; // Import AddCoworkerContent
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const [showAddCoworkerContent, setShowAddCoworkerContent] = useState(false);

  // Handler to show AddCoworkerContent when CreateAnEmployee is clicked
  const handleCreateEmployeeClick = () => {
    setShowAddCoworkerContent(true);
  };

  // Close AddCoworkerContent
  const closeAddCoworkerContent = () => {
    setShowAddCoworkerContent(false);
  };

  return (
    <div className={styles.container}>
      {showAddCoworkerContent && (
        <AddCoworkerContent close={closeAddCoworkerContent} />
      )}{" "}
      {/* Pass close function */}
      <Link href="/">
        <Image src={"/Logo.png"} width={210} height={38} alt="logo" priority />
      </Link>
      <div className={styles.headerButtons}>
        <CreateAnEmployee
          text="თანამშრომლის შექმნა"
          onClick={handleCreateEmployeeClick}
        />{" "}
        {/* Pass handler */}
        <CreateNewTask showImage={true} text="შექმენი ახალი დავალება" />
      </div>
    </div>
  );
};

export default Header;
