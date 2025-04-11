"use client";

import styles from "./NewStatusWithEmployee.module.css";
import Image from "next/image";

// Types
export type Employee = {
  id: number;
  name: string;
  surname: string;
  avatar: string;
  department: {
    id: number;
    name: string;
  };
};

type Props = {
  employee: Employee;
};

const NewStatusWithEmployee = ({ employee }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.employeeInfo}>
        <Image
          src={employee.avatar}
          alt="avatar"
          width={32}
          height={32}
          className={styles.avatar}
        />
        <div className={styles.textContainer}>
          <p className={styles.departmentName}>{employee.department.name}</p>
          <p className={styles.employeeName}>
            {employee.name} {employee.surname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewStatusWithEmployee;
