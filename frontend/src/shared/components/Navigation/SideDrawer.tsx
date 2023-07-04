import React from "react";
import ReactDom from "react-dom";
import { CSSTransition } from "react-transition-group";

import styles from "./SideDrawer.module.scss";

const SideDrawer: React.FC<{
  children: React.ReactNode;
  show: boolean;
  onClick: () => void;
}> = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className={styles["side-drawer"]} onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDom.createPortal(
    content,
    // document.getElementById("drawer-hook") as HTMLDivElement
    document.body
  );
};

export default SideDrawer;
