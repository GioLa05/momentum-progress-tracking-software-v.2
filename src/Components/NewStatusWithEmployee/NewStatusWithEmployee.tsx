// ✅ NewStatusWithEmployee.tsx (Client Component)
"use client";

import styles from "./NewStatusWithEmployee.module.css";

// Types
export type Status = {
  id: number;
  name: string;
};

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
  status: Status;
  employee: Employee;
};

const NewStatusWithEmployee = ({ status, employee }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.employeeInfo}>
        <img src={employee.avatar} alt="avatar" className={styles.avatar} />
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
