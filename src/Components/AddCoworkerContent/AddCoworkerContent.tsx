import React, { useEffect, useRef } from "react";
import styles from "./AddCoworkerContent.module.css";
import Image from "next/image";
import MainComponent from "../ResponsibleEmployee/ResponsibleEmployee";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import CreateAnEmployee from "../CreateAnEmployee/createAnEmployee";
import CreateNewTask from "../CreateNewTask/CreateNewTask";

type Props = { close: () => void };  // Pass a close function as a prop

const AddCoworkerContent = ({ close }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);  // Create ref for the container

  useEffect(() => {
    // Function to check if click is outside the container
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        close();  // Call the close function when clicking outside
      }
    };

    // Add event listener for mouse click
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div className={styles.containerBackground}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.closeIcon}>
          <Image
            className={styles.closeIconBtn}
            src={"/XgreyBtn.svg"}
            width={40}
            height={40}
            alt="close"
            onClick={close}  // Close when clicking the close icon
          />
        </div>
        <div className={styles.containerContentPlusText}>
          <p>თანამშრომლის დამატება</p>
          <div className={styles.containerContent}>
            <div className={styles.nameSurname}>
              <MainComponent
                label="სახელი*"
                placeholder=""
                type="name"
                iconSrc="icon.svg"
                disabled={false}
                size="small"
                hideBottomText={false}
              />
              <MainComponent
                label="გვარი*"
                placeholder=""
                type="surname"
                iconSrc="icon.svg"
                disabled={false}
                size="small"
                hideBottomText={false}
              />
            </div>
            <UploadPhoto />
            <MainComponent
              placeholder=""
              type="text"
              iconSrc="icon-source"
              disabled={false}
              label={""}
              size="small" // or "big"
              hideBottomText={true} // Hide bottom text
            />
            <div className={styles.bottomButtons}>
              <CreateAnEmployee text="გაუქმება" onClick={close} /> {/* Pass close to the button */}
              <CreateNewTask showImage={false} text="დაამატე თანამშრომელი" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCoworkerContent;
