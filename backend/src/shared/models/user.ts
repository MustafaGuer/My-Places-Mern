import { Schema, model } from "mongoose";
// import mongooseUniqueValidator = require("mongoose-unique-validator");
var uniqueValidator = require("mongoose-unique-validator");

interface IUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  places: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
  places: { type: String, required: true },
});

// userSchema.plugin(mongooseUniqueValidator);
userSchema.plugin(uniqueValidator);

const User = model<IUser>("User", userSchema);

export default User;
