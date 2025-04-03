import { API_URL, API_TOKEN } from "@/config/config";
import styles from "./page.module.css";
import Level from "@/Components/Level/Level";
import RankButton from "@/Components/RankButton/RankButton";
import Image from "next/image";
import StatusButtonWrapper from "@/Components/StatusButtonWrapper/statusButtonWrapper";
import NewStatusWithEmployee from "@/Components/NewStatusWithEmployee/NewStatusWithEmployee";
import Comment from "@/Components/Comment/Comment";
import Answer from "@/Components/Answer/answer";

// Helper: Priority name to level
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

// Helper: Department styling map
const departmentStylesMap: Record<
  number,
  {
    text: string;
    color:
      | "pink"
      | "orange"
      | "blue"
      | "yellow"
      | "green"
      | "purple"
      | "red"
      | "teal";
  }
> = {
  1: { text: "ადმინისტრაცია", color: "teal" },
  2: { text: "ადამიანური რესურსები", color: "green" },
  3: { text: "ფინანსები", color: "purple" },
  4: { text: "მარკეტინგი", color: "orange" },
  5: { text: "ლოჯისტიკა", color: "yellow" },
  6: { text: "ინფ. ტექ.", color: "blue" },
  7: { text: "მედია", color: "red" },
  8: { text: "დიზაინი", color: "pink" },
};

// Task type
type TaskData = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: {
    id: number;
    name: string;
  };
  department: {
    id: number;
    name: string;
  };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
  };
  priority: {
    id: number;
    name: string;
    icon: string;
  };
};

export default async function Page({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await paramsPromise;

  // Fetch task
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>დავალება ვერ მოიძებნა</div>;
  }

  const task: TaskData = await res.json();

  // Fetch comments
  const commentRes = await fetch(`${API_URL}/tasks/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    cache: "no-store",
  });

  let comments: any[] = [];

  if (commentRes.ok) {
    comments = await commentRes.json();
  }

  // Format date like: ორშ - 02/2/2025
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

            <div className={styles.taskDetails}>
              <div className={styles.detailsRight}>
                <Image
                  src={"/status.svg"}
                  width={24}
                  height={24}
                  alt="status"
                />
                <p>სტატუსი</p>
              </div>
              <StatusButtonWrapper taskStatus={task.status} />
            </div>

            <div className={styles.taskDetails}>
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

            <div className={styles.taskDetails}>
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

      <div className={styles.commentsContainer}>
        <Comment />
        <div
          className={`${styles.quantityContainer} ${
            comments.length > 0 ? styles.withPadding : ""
          }`}
        >
          <p>კომენტარები</p>
          <div className={styles.commentNumber}>{comments.length}</div>
        </div>

        {comments.length > 0 &&
          comments.map((comment, index) => (
            <Answer key={index} type="question" comment={comment} />
          ))}
      </div>
    </div>
  );
}
