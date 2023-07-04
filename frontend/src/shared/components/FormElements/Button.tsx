import React from "react";
import { Link } from "react-router-dom";

import styles from "./Button.module.scss";

const Button: React.FC<{
  href?: string;
  to?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  exact?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  disabled?: boolean;
}> = (props) => {
  const classNames = `${styles.button}${
    props.size ? " " + styles[`button--${props.size}`] : ""
  }${props.inverse ? " " + styles["button--inverse"] : ""}${
    props.danger ? " " + styles["button--danger"] : ""
  }`;

  if (props.href) {
    return (
      <a href={props.href} className={classNames}>
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link to={props.to} className={classNames}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={classNames}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
