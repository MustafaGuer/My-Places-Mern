import React from "react";

import UserItem from "./UserItem";
import User from "../../shared/models/User";
import Card from "../../shared/components/UIElements/Card";
import styles from "./UsersList.module.scss";

const UsersList: React.FC<{ items: Array<User> }> = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className={styles["users-list"]}>
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            avatar={user.avatar}
            name={user.name}
            placeCount={user.places.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
