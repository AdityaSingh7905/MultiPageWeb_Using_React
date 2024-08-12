import { Fragment, useState } from "react";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
import Blocker from "../UI/Blocker";

const QuoteForm = (props) => {
  const [isFocus, setIsFocus] = useState(false);
  const [enteredAuthor, setEnteredAuthor] = useState("");
  const [authorBlur, setAuthorBlur] = useState(false);

  const [enteredText, setEnteredText] = useState("");
  const [textBlur, setTextBlur] = useState(false);

  const authorIsInvalid = enteredAuthor.trim().length === 0;
  const authorError = authorIsInvalid && authorBlur;

  const textIsInvalid = enteredText.trim().length === 0;
  const textError = textIsInvalid && textBlur;

  let formIsValid = false;
  if (!authorIsInvalid && !textIsInvalid) {
    formIsValid = true;
  }

  const focusHandler = () => {
    setIsFocus(true);
  };

  const focusChangeHandler = () => {
    setIsFocus(false);
  };

  const authorChangeHandler = (event) => {
    setEnteredAuthor(event.target.value);
  };

  const authorBlurHandler = (event) => {
    setAuthorBlur(true);
  };

  const textChangeHandler = (event) => {
    setEnteredText(event.target.value);
  };

  const textBlurHandler = (event) => {
    setTextBlur(true);
  };

  function submitFormHandler(event) {
    event.preventDefault();

    // optional: Could validate here
    props.onAddQuote({ author: enteredAuthor, text: enteredText });
    // setEnteredAuthor('');
    // setEnteredText('');
    // setAuthorBlur(false);
    // setTextBlur(false);
  }

  return (
    <Fragment>
      <Blocker isFocus={isFocus} />
      <Card>
        <form
          onFocus={focusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={enteredAuthor}
              onChange={authorChangeHandler}
              onBlur={authorBlurHandler}
            />
            {authorError && <p>Please enter a valid text.</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              value={enteredText}
              onChange={textChangeHandler}
              onBlur={textBlurHandler}
            ></textarea>
            {textError && <p>Please enter a valid text.</p>}
          </div>
          <div className={classes.actions}>
            <button
              disabled={!formIsValid}
              onClick={focusChangeHandler}
              className="btn"
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
