import { Fragment } from "react";
import { useBlocker } from "react-router-dom";
import classes from "./Blocker.module.css";
const Blocker = (props) => {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      props.isFocus !== false &&
      currentLocation.pathname !== nextLocation.pathname
  );

  // unstable_usePrompt({
  //   message: "Are you sure want to exit?? Your all data will be lost!!",
  //   when: (location) => isFocus === true,
  // });

  return (
    <Fragment>
      {blocker.state === "blocked" ? (
          <div className={classes.block}>
            <p>Are you sure you want to leave?</p>
            <button onClick={() => blocker.proceed()}>Proceed</button>
            <button onClick={() => blocker.reset()}>Cancel</button>
          </div>
      ) : null}
    </Fragment>
  );
};

export default Blocker;
