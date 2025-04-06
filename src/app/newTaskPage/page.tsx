"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./page.module.css";
import { TaskNameInput } from "@/Components/TaskNameInput/TaskNameInput";
import { TaskDescriptionInput } from "@/Components/TaskDescriptionInput/TaskDescriptionInput";
import PriorityButton from "@/Components/PriorityButton/PriorityButton.tsx";
import StatusButtonStyled from "@/Components/StatusButton/statusButton";
import DepartmentDropdown from "@/Components/DepartmentDropdown/DepartmentDropdown";
import EmployeeDropdown from "@/Components/EmployeeDropdown/EmployeeDropdown";
import DatePicker from "@/Components/Calendar/DatePicker";
import CreateNewTask from "@/Components/CreateNewTask/CreateNewTask";

const API_URL = "https://momentum.redberryinternship.ge/api/tasks";
const API_TOKEN = "9e8fd40a-1bc6-42ab-9deb-26ff41262121";

const NewTaskPage = () => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  const initialValues = {
    name: "",
    description: "",
    priority_id: null as number | null,
    employee_id: null as number | null,
    department_id: null as number | null,
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(255).required("სავალდებულოა"),
    description: Yup.string().min(2).max(1000).required("სავალდებულოა"),
    priority_id: Yup.number().required("აირჩიე პრიორიტეტი"),
    employee_id: Yup.number().required("აირჩიე თანამშრომელი"),
    department_id: Yup.number().required("აირჩიე დეპარტამენტი"),
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
          employee_id: values.employee_id,
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
              <div className={styles.inputGrid}>
                <div className={styles.leftCol}>
                  <TaskNameInput formik={formik} />
                  <TaskDescriptionInput formik={formik} />
                  <div className={styles.priorityStatusGrouped}>
                    <PriorityButton formik={formik} />
                    <StatusButtonStyled formik={formik} />
                  </div>
                </div>

                <div className={styles.rightCol}>
                  <div className={styles.departmentDropdown}>
                    <DepartmentDropdown
                      formik={formik}
                      width={550}
                      onSelect={(id: number) => {
                        console.log("📌 Selected department ID:", id);
                        setSelectedDepartmentId(id);
                        formik.setFieldValue("employee_id", null);
                      }}
                    />
                  </div>

                  <EmployeeDropdown
                    formik={formik}
                    width={550}
                    selectedDepartmentId={selectedDepartmentId}
                  />
                  <div className={styles.datePicker}>
                    <DatePicker
                      formik={formik}
                      width={550}
                      label="დავალების ვადა"
                      placeholder="აირჩიეთ თარიღი"
                    />
                  </div>

                  <div className={styles.createNewTask}>
                    <CreateNewTask
                      formik={formik}
                      width={550} // still passed but overridden in style
                      label="დავალების შექმნა"
                      placeholder="შექმნა"
                      variant="form" // 👈 tells the component to switch to "form mode"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default NewTaskPage;
