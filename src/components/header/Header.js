import { NavLink, useLocation} from "react-router-dom";
import classes from "./Header.module.css";
import { Fragment, useState } from "react";
import Home from "./Home";

const Header = () => {
  
  const [homeIsVisible, setHomeIsVisible] = useState(true);
  const location = useLocation();
  console.log(location);

  const locateHome = location.pathname === '/';

  const visibleChangeHandler = () => {
    setHomeIsVisible(false);
  };

  return (
    <Fragment>
      <div className={classes.header}>
        <h1>Aditya Sangnil Quotes</h1>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink
                to="/quotes"
                className={({ isActive }) => (isActive ? classes.active : "")}
                onClick={visibleChangeHandler}
              >
                All Quotes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new-quote"
                className={({ isActive }) => (isActive ? classes.active : "")}
                onClick={visibleChangeHandler}
              >
                Add a Quote
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {homeIsVisible && locateHome && <Home />}
      </Fragment>
  );
};

export default Header;
