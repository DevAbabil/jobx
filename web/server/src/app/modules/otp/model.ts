import { model, Schema } from 'mongoose';
import { Collection } from '@/config';
import { type IOtp, OtpType } from './interface';

const otpSchema = new Schema<IOtp>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(OtpType),
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  },
  { timestamps: true }
);

// Auto-delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Otp = model(Collection.Otp, otpSchema);
