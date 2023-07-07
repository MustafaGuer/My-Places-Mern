import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import HttpError from "../shared/model/http-error";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "John Doe",
    email: "jdoe@foo.bar",
    password: "testers",
  },
];

const getUsers = (req: Request, res: Response) => {
  res.json({ users: DUMMY_USERS });
};

const postSignup = (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const userExists = DUMMY_USERS.find((u) => u.email === email);

  if (userExists) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const postLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = DUMMY_USERS.find((u) => u.email === email);
  if (!user || user.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged in!" });
};

export default { getUsers, postSignup, postLogin };
