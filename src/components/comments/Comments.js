import { useState, useEffect, useCallback } from "react";
import useHttp from "../hooks/use-http";
import { getAllComments } from "../lib/api";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest,
    status,
    data: loadedComments,
    error,
  } = useHttp(getAllComments);

  const { quoteId } = props;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  },[sendRequest, quoteId]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    comments = <div className="centered focused">{error}</div>;
  }
  if (status === "completed" && (loadedComments && loadedComments.length > 0)) {
    console.log(loadedComments);
    comments = <CommentsList comments={loadedComments} />;
  }
  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p>No comments yet!!</p>;
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={props.quoteId}
          onAddComment={addCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
