"use client";

import React, { useState } from "react";
import styles from "./Comment.module.css";
import LargePrimaryButton from "../LargePrimaryButton/LargePrimaryButton";

type Props = {
  taskId: number;
  onNewComment: () => void;
  parentId?: number; // ✅ დამატებულია
};

const Comment = ({ taskId, onNewComment, parentId }: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          text,
          parentId, // ✅ გაიგზავნება მხოლოდ თუ არსებობს
        }),
      });

      if (res.ok) {
        setText("");
        onNewComment();
      } else {
        console.error("Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        placeholder="დააკომენტარე"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.buttonWrapper}>
        <LargePrimaryButton
          text={loading ? "იტვირთება..." : "დააკომენტარე"}
          onClick={handleComment}
        />
      </div>
    </div>
  );
};

export default Comment;
