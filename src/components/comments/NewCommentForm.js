import { useEffect, useRef } from "react";

import classes from "./NewCommentForm.module.css";
import useHttp from "../hooks/use-http";
import { addComment } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);

  const { quoteId, onAddComment } = props;

  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [status, error, onAddComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
    const commentText = commentTextRef.current.value;
    console.log(commentText);

    const commentObj = {
      quoteId: quoteId,
      commentData: {
        text : commentText
      },
    };
    sendRequest(commentObj);

    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
