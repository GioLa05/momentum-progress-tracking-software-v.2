"use client";

import React, { useState } from "react";
import styles from "./UploadPhoto.module.css";
import Image from "next/image";

type Props = {};

const UploadPhoto = (props: Props) => {
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false); // State to track if the photo is uploaded

  const handleUploadClick = () => {
    setIsPhotoUploaded(true); // Set to true when the button is clicked (simulating upload)
  };

  const handleDeleteClick = () => {
    setIsPhotoUploaded(false); // Set to false when delete button is clicked (reset to upload button)
  };

  return (
    <div className={styles.groupedButton}>
      <p>ავატარი*</p>
      <div className={styles.container}>
        {isPhotoUploaded && (
          <Image
            className={styles.deleteButton}
            src={"/delete.svg"}
            width={24}
            height={24}
            alt="delete"
            onClick={handleDeleteClick} // When clicked, reset the state and show upload button
          />
        )}
        <div className={styles.button}>
          {!isPhotoUploaded ? (
            <div
              className={`${styles.uploadButton} ${
                isPhotoUploaded ? styles.noPadding : ""
              }`}
              onClick={handleUploadClick} // Upload photo on click
            >
              <Image
                src={"/galleryExport.svg"}
                width={34}
                height={28}
                alt="galleryExport"
              />
              <p>ატვირთე ფოტო</p>
            </div>
          ) : (
            <div className={styles.photoGroup}>
              <Image
                src={"/coworkerPhoto.png"}
                width={88}
                height={88}
                alt="coworkerPhoto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadPhoto;
