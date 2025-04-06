"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./page.module.css";
import { TaskNameInput } from "@/Components/TaskNameInput/TaskNameInput";
import { TaskDescriptionInput } from "@/Components/TaskDescriptionInput/TaskDescriptionInput";
import PriorityButton from "@/Components/PriorityButton/PriorityButton.tsx";
import StatusButtonStyled from "@/Components/StatusButton/statusButton";

const API_URL = "https://momentum.redberryinternship.ge/api/tasks";
const API_TOKEN = "9e8fd40a-1bc6-42ab-9deb-26ff41262121";

const NewTaskPage = () => {
  const initialValues = {
    name: "",
    description: "",
    priority_id: null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(255).required("სავალდებულოა"),
    description: Yup.string().min(2).max(1000).required("სავალდებულოა"),
    priority_id: Yup.number().required("აირჩიე პრიორიტეტი"),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
          name: values.name,
          description: values.description,
          due_date: "2025-12-31",
          status_id: 1,
          employee_id: 1,
          priority_id: values.priority_id,
        }),
      });

      if (!response.ok) throw new Error("დავალების დამატება ვერ მოხერხდა");

      const data = await response.json();
      console.log("დავალება დაემატა:", data);
      resetForm();
    } catch (error) {
      console.error("შეცდომა:", error);
    }
  };

  return (
    <div className={styles.page}>
      <p className={styles.header}>შექმენი ახალი დავალება</p>
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className={styles.formContainer}>
              <TaskNameInput formik={formik} />
              <TaskDescriptionInput formik={formik} />
              <div className={styles.priorityStatusGrouped}>
                <PriorityButton formik={formik} />
                <StatusButtonStyled formik={formik} />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewTaskPage;
