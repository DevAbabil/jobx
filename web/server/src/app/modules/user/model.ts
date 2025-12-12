import { model, Schema } from 'mongoose';
import { Collection } from '@/config';
import { type IUser, Role } from './interface';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    isPro: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = model(Collection.User, userSchema);
