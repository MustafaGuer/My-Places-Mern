import React from "react";

import styles from "./Avatar.module.scss";

const Avatar: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  avatar: string;
  alt: string;
  width?: string;
}> = (props) => {
  return (
    <div className={`${styles.avatar} ${props.className}`} style={props.style}>
      <img
        src={props.avatar}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
