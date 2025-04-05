// src/Components/AddCoworkerContent/AddCoworkerContent.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./AddCoworkerContent.module.css";
import Image from "next/image";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import CreateAnEmployee from "../CreateAnEmployee/createAnEmployee";
import CreateNewTask from "../CreateNewTask/CreateNewTask";
import { NameInput, SurnameInput } from "../FullName/FullName";
import { useFormik } from "formik";
import * as Yup from "yup";
import DepartmentDropdown from "../DepartmentDropdown/DepartmentDropdown";
import { API_TOKEN } from "@/config/config";

type Props = {
  close: () => void;
  onEmployeeAdded: () => void;
};

const AddCoworkerContent = ({ close, onEmployeeAdded }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      avatar: "",
      department_id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2).max(255).required("სახელი სავალდებულოა"),
      surname: Yup.string().min(2).max(255).required("გვარი სავალდებულოა"),
      avatar: Yup.string().required("ფოტო სავალდებულოა"),
      department_id: Yup.string().required("დეპარტამენტი სავალდებულოა"),
    }),
    onSubmit: async (values) => {
      if (!selectedFile) {
        formik.setFieldError("avatar", "ფოტო სავალდებულოა");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("avatar", selectedFile);
      formData.append("department_id", values.department_id);

      try {
        const response = await fetch(
          "https://momentum.redberryinternship.ge/api/employees",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
              Accept: "application/json",
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error("❌ Error:", errorData);
          return;
        }

        onEmployeeAdded(); // 🔁 Refresh context and tasks
        close(); // ❌ Close modal
      } catch (err) {
        console.error("Network error:", err);
      }
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const handleFileSelected = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <div className={styles.containerBackground}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.closeIcon}>
          <Image
            className={styles.closeIconBtn}
            src="/XgreyBtn.svg"
            width={40}
            height={40}
            alt="close"
            onClick={close}
          />
        </div>

        <div className={styles.containerContentPlusText}>
          <p>თანამშრომლის დამატება</p>

          <form onSubmit={formik.handleSubmit}>
            <div className={styles.containerContent}>
              <div className={styles.nameSurname}>
                <NameInput formik={formik} />
                <SurnameInput formik={formik} />
              </div>

              <UploadPhoto
                formik={formik}
                onFileSelected={handleFileSelected}
              />
              <DepartmentDropdown formik={formik} />

              <div className={styles.bottomButtons}>
                <CreateAnEmployee text="გაუქმება" onClick={close} />
                <CreateNewTask
                  showImage={false}
                  text="დაამატე თანამშრომელი"
                  onClick={formik.handleSubmit}
                  type="submit" // ✅ explicitly submit the form
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCoworkerContent;
