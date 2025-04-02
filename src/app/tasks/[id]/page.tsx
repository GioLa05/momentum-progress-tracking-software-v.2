// src/app/tasks/[id]/page.tsx

import { API_URL, API_TOKEN } from "@/config/config";

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
  params: Promise<{ id: string }>; // ✅ Next.js 15: params is now a Promise
}) {
  const { id } = await paramsPromise; // ✅ await the Promise

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

  const formattedDate = new Date(task.due_date).toLocaleDateString("ka-GE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>{task.name}</h1>
      <p style={{ fontSize: "1.2rem", color: "#444" }}>{task.description}</p>

      <div style={{ marginTop: "1.5rem", color: "#666" }}>
        <p>
          <strong>დეპარტამენტი:</strong> {task.department.name}
        </p>
        <p>
          <strong>თანამშრომელი:</strong> {task.employee.name} {task.employee.surname}
        </p>
        <p>
          <strong>სტატუსი:</strong> {task.status.name}
        </p>
        <p>
          <strong>პრიორიტეტი:</strong> {task.priority.name}
        </p>
        <p>
          <strong>ვადა:</strong> {formattedDate}
        </p>
      </div>
    </main>
  );
}
