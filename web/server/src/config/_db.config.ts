import mongoose from 'mongoose';
import { ENV } from './_env.config';

export enum Collection {
  Asset = 'Asset',
  GetInTouch = 'GetInTouch',
  Project = 'Project',
  User = 'User',
  Newsletter = 'Newsletter',
  Share = 'Share',
  Blog = 'Blog',
  Otp = 'Otp',
}

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.DB_URI, {
      dbName: ENV.DB_NAME,
      user: ENV.DB_USER,
      pass: ENV.DB_PASS,
    });
    console.log('Database connected!');
  } catch (error) {
    console.error('Database Connection failed!', error);
    throw error;
  }
};
