import React, { useContext } from "react";

import { AuthContext, AuthContextT } from "../../context/auth-context";
import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.scss";
import Button from "../FormElements/Button";

const NavLinks: React.FC<{}> = (props) => {
  const authCtx = useContext<AuthContextT>(AuthContext);

  return (
    <ul className={styles["nav-links"]}>
      <li>
        <NavLink to="/" activeClassName={styles.active} exact>
          ALL USERS
        </NavLink>
      </li>
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to="/u1/places" activeClassName={styles.active}>
            MY PLACES
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <NavLink to="/places/new" activeClassName={styles.active}>
            ADD PLACE
          </NavLink>
        </li>
      )}
      {!authCtx.isLoggedIn && (
        <li>
          <NavLink to="/auth" activeClassName={styles.active}>
            AUTHENTICATE
          </NavLink>
        </li>
      )}
      {authCtx.isLoggedIn && (
        <li>
          <Button onClick={authCtx.logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
