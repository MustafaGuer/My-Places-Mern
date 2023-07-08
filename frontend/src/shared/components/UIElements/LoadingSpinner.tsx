import React from "react";

import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC<{ asOverlay?: boolean }> = (props) => {
  return (
    <div className={`${props.asOverlay && styles["loading-spinner__overlay"]}`}>
      <div className={styles["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
