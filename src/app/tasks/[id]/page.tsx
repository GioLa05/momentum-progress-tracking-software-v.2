import { API_URL, API_TOKEN } from "@/config/config";
import styles from "./page.module.css";
import ClientPage from "./ClientPage";
import Level from "@/Components/Level/Level";
import RankButton from "@/Components/RankButton/RankButton";
import Image from "next/image";
import NewStatusWithEmployee from "@/Components/NewStatusWithEmployee/NewStatusWithEmployee";
import TaskStatusDropdown from "@/Components/TaskStatusDropdown/TaskStatusDropdown";

const getPriorityLevel = (name: string): string => {
  switch (name) {
    case "დაბალი":
      return "low";
    case "საშუალო":
      return "medium";
    case "მაღალი":
      return "high";
    default:
      return "low";
  }
};

const departmentStylesMap = {
  1: { text: "ადმინისტრაცია", color: "teal" },
  2: { text: "ადამიანური რესურსები", color: "green" },
  3: { text: "ფინანსები", color: "purple" },
  4: { text: "მარკეტინგი", color: "orange" },
  5: { text: "ლოჯისტიკა", color: "yellow" },
  6: { text: "ინფ. ტექ.", color: "blue" },
  7: { text: "მედია", color: "red" },
  8: { text: "დიზაინი", color: "pink" },
};

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;

  const res = await fetch(`${API_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>დავალება ვერ მოიძებნა</div>;
  }

  const task = await res.json();

  const date = new Date(task.due_date);
  const weekday = new Intl.DateTimeFormat("ka-GE", { weekday: "short" }).format(
    date
  );
  const formattedDate = `${weekday} - ${date
    .getDate()
    .toString()
    .padStart(2, "0")}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const departmentStyle = departmentStylesMap[task.department.id];

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.info}>
          <div>
            <div className={styles.levelPlusName}>
              <div className={styles.levelPriority}>
                <Level
                  priority={getPriorityLevel(task.priority.name)}
                  size="small"
                />
                <RankButton
                  color={departmentStyle.color}
                  text={departmentStyle.text}
                />
              </div>
              <p className={styles.h1}>{task.name}</p>
            </div>
            <p className={styles.description}>{task.description}</p>
          </div>

          <div>
            <p className={styles.taskH1}>დავალების დეტალები</p>

            <TaskStatusDropdown status={task.status} taskId={task.id} />


            <div className={styles.centeredTaskDetails}>
              <div className={styles.detailsRight}>
                <Image src={"/user.svg"} width={24} height={24} alt="user" />
                <p>თანამშრომელი</p>
              </div>
              <NewStatusWithEmployee
                status={task.status}
                employee={{
                  ...task.employee,
                  department: task.department,
                }}
              />
            </div>

            <div className={styles.centeredTaskDetails}>
              <div className={styles.detailsRight}>
                <Image
                  src={"/calendar.svg"}
                  width={24}
                  height={24}
                  alt="calendar"
                />
                <p>დავალების ვადა</p>
              </div>
              <p className={styles.formattedDate}>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>

      <ClientPage task={task} />
    </div>
  );
}
