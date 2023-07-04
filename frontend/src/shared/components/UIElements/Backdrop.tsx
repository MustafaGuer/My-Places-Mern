import React from "react";
import ReactDOM from "react-dom";

import styles from "./Backdrop.module.scss";

const Backdrop: React.FC<{ onClick: () => void }> = (props) => {
  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={props.onClick}></div>,
    document.body
  );
};

export default Backdrop;
