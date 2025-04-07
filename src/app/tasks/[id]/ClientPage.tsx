"use client";

import React, { useEffect, useState } from "react";
import Comment from "@/Components/Comment/Comment";
import Answer from "@/Components/Answer/answer";
import styles from "./page.module.css";
import { API_URL, API_TOKEN } from "@/config/config";

type CommentType = {
  id: number;
  text: string;
  author_nickname?: string;
  author_avatar?: string | null;
  sub_comments?: CommentType[];
};

type TaskData = {
  id: number;
  name: string;
  description: string;
  due_date: string;
  status: { id: number; name: string };
  department: { id: number; name: string };
  employee: {
    id: number;
    name: string;
    surname: string;
    avatar: string;
  };
  priority: { id: number; name: string; icon: string };
};

type Props = {
  task: TaskData;
};

const ClientPage = ({ task }: Props) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  const fetchComments = async () => {
    const res = await fetch(`${API_URL}/tasks/${task.id}/comments`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      setComments(data);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // ✅ Recursive function to count all comments and sub-comments
  const countAllComments = (comments: CommentType[]): number => {
    let total = 0;

    for (const comment of comments) {
      total += 1;
      if (comment.sub_comments && comment.sub_comments.length > 0) {
        total += countAllComments(comment.sub_comments);
      }
    }

    return total;
  };

  return (
    <div className={styles.commentsContainer}>
      <Comment taskId={task.id} onNewComment={fetchComments} />

      <div
        className={`${styles.quantityContainer} ${
          comments.length > 0 ? styles.withPadding : ""
        }`}
      >
        <p>კომენტარები</p>
        <div className={styles.commentNumber}>{countAllComments(comments)}</div>
      </div>

      {comments.map((comment) => (
        <Answer
          key={comment.id}
          type="question"
          comment={comment}
          taskId={task.id}
          onReply={fetchComments}
        />
      ))}
    </div>
  );
};

export default ClientPage;
