import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import classes from "./Layout.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const Layout = (props) => {
  return (
    <Suspense
      fallback={
        <div className="centered">
          <LoadingSpinner />
        </div>
      }
    >
      <section>
        <Header />
        <main className={classes.main}>
          <Outlet />
        </main>
      </section>
    </Suspense>
  );
};

export default Layout;
