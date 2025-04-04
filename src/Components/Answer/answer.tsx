import React, { useState } from "react";
import styles from "./answer.module.css";
import Image from "next/image";
import AnswerBtn from "../AnswerBtn/answerBtn";
import Comment from "../Comment/Comment";

type CommentType = {
  id: number;
  text: string;
  author_nickname?: string;
  author_avatar?: string | null;
  sub_comments?: CommentType[];
};

type Props = {
  type?: "question" | "answer";
  comment: CommentType;
  taskId?: number;
  onReply?: () => void;
};

const Answer = ({ type = "answer", comment, taskId, onReply }: Props) => {
  const fullName = comment.author_nickname || "უცნობი ავტორი";

  const defaultSrc = "/Coworker.png";
  const isSvg = comment.author_avatar?.includes(".svg") || comment.author_avatar?.includes("svg?");
  const initialSrc =
    comment.author_avatar && comment.author_avatar.trim() !== ""
      ? comment.author_avatar
      : defaultSrc;

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <div
      className={styles.wrapper}
      style={{
        paddingBottom: type === "answer" ? "0px" : "57px",
      }}
    >
      <div className={styles.container}>
        <div className={styles.infoLeft}>
          {isSvg ? (
            <img
              src={imgSrc}
              alt="user"
              width={38}
              height={38}
              onError={() => setImgSrc(defaultSrc)}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <Image
              src={imgSrc}
              alt="user"
              width={38}
              height={38}
              onError={() => setImgSrc(defaultSrc)}
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          )}
        </div>

        <div className={styles.infoRight}>
          <div className={styles.text}>
            <p className={styles.h1}>{fullName}</p>
            <p className={styles.h2}>{comment.text}</p>
          </div>

          {type === "question" && (
            <AnswerBtn onClick={() => setShowReplyInput((prev) => !prev)} />
          )}
        </div>
      </div>

      {showReplyInput && taskId && (
        <div className={styles.replyInput}>
          <Comment
            taskId={taskId}
            parentId={comment.id}
            onNewComment={() => {
              onReply?.();
              setShowReplyInput(false);
            }}
          />
        </div>
      )}

      {comment.sub_comments?.length > 0 && (
        <div className={styles.subAnswers}>
          {comment.sub_comments.map((reply) => (
            <Answer
              key={reply.id}
              type="answer"
              comment={reply}
              taskId={taskId}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Answer;
