import React from "react";

import styles from "./Input.module.scss";

const Input: React.FC<{
  label: string;
  id: string;
  element?: string;
  placeholder?: string;
  type: string;
  rows?: number;
}> = (props) => {
  const element =
    props.element === "input" ? (
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3}></textarea>
    );

  return (
    <div className={`${styles["form-control"]}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
};

export default Input;
