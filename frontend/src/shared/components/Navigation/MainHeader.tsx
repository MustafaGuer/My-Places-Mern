import React from "react";

import styles from "./MainHeader.module.scss";

const MainHeader: React.FC<{ children?: React.ReactNode }> = (props) => {
  return <header className={styles["main-header"]}>{props.children}</header>;
};

export default MainHeader;
