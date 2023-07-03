import React from "react";
import UsersList from "../components/UsersList";
import User from "../../shared/models/User";
import simpsonize from "../../shared/images/simpsonize.png";

const DUMMY_USERS: User[] = [
  {
    id: "u1",
    name: "John Doe",
    image: simpsonize,
    places: 10,
  },
];

const Users = () => {
  return <UsersList items={DUMMY_USERS} />;
};

export default Users;
