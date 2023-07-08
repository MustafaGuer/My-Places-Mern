import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import styles from "./UserItem.module.scss";

const UserItem: React.FC<{
  id: string;
  name: string;
  avatar: string;
  placeCount: number;
}> = (props) => {
  return (
    <li className={styles["user-item"]}>
      <Card className="p-0">
        <Link to={`/${props.id}/places`}>
          <div className={styles["user-item__image"]}>
            <Avatar avatar={props.avatar} alt={props.name} />
          </div>
          <div className={styles["user-item__info"]}>
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
