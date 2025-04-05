"use client";

import React, { useRef, useState } from "react";
import styles from "./UploadPhoto.module.css";
import Image from "next/image";

type Props = {
  formik: any;
  onFileSelected: (file: File) => void; // Callback to pass file to parent
};

const UploadPhoto = ({ formik, onFileSelected }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setError("გთხოვთ, აირჩიოთ ფაილი");
      formik.setFieldError("avatar", "ფოტო სავალდებულოა");
      return;
    }

    // Validate file size (optional, based on previous requirement)
    if (file.size > 2 * 1024 * 1024) {
      setError("ფაილის ზომა არ უნდა აღემატებოდეს 2MB-ს");
      formik.setFieldError("avatar", "ფაილის ზომა ძალიან დიდია");
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setError(null);
    formik.setFieldValue("avatar", file.name); // Update Formik for validation
    onFileSelected(file); // Pass file to parent
  };

  const handleDeleteClick = () => {
    setImagePreview(null);
    formik.setFieldValue("avatar", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelected(null as any); // Clear file in parent
  };

  return (
    <div className={styles.groupedButton}>
      <p>ავატარი*</p>
      <div className={styles.container}>
        {imagePreview && (
          <Image
            className={styles.deleteButton}
            src="/delete.svg"
            width={24}
            height={24}
            alt="delete"
            onClick={handleDeleteClick}
          />
        )}

        <div className={styles.button}>
          {!imagePreview ? (
            <div className={styles.uploadButton} onClick={handleUploadClick}>
              <Image
                src="/galleryExport.svg"
                width={34}
                height={28}
                alt="upload"
              />
              <p>ატვირთე ფოტო</p>
            </div>
          ) : (
            <div className={styles.photoGroup}>
              <Image
                src={imagePreview}
                width={88}
                height={88}
                alt="uploaded"
              />
            </div>
          )}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default UploadPhoto;