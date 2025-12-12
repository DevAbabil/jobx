import { Schema, model } from "mongoose";
import { IUser, Role } from "./interface";
import { Collection } from "@/config";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
  },
  { timestamps: true }
);

export const User = model(Collection.User, userSchema);
