import { AppError } from '@/app/errors';
import { HTTP_CODE, sendMail } from '@/shared';
import { User } from '../user/model';
import {
  type IGenerateOtpPayload,
  type IVerifyOtpPayload,
  OtpType,
} from './interface';
import { Otp } from './model';

export const generateOtp = async ({ email, type }: IGenerateOtpPayload) => {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found with this email!');
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Delete any existing OTPs for this email and type
  await Otp.deleteMany({ email, type });

  // Save new OTP
  await Otp.create({
    email,
    otp,
    type,
  });

  // Determine email subject based on type
  const subject =
    type === OtpType.FORGOT_PASSWORD
      ? 'Password Reset Code - JobX'
      : 'Email Verification Code - JobX';

  // Send OTP email
  await sendMail({
    to: email,
    subject,
    template: {
      name: 'otp-verification',
      data: { otp },
    },
  });

  return {
    message: 'OTP sent to your email address',
    email: email.replace(/(.{2})(.*)(@.*)/, '$1***$3'), // Mask email for security
  };
};

export const verifyOtp = async ({ email, otp, type }: IVerifyOtpPayload) => {
  const otpRecord = await Otp.findOne({
    email,
    otp,
    type,
    expiresAt: { $gt: new Date() },
  });

  if (!otpRecord) {
    throw new AppError(HTTP_CODE.BAD_REQUEST, 'Invalid or expired OTP!');
  }

  return {
    message: 'OTP verified successfully',
    otpId: otpRecord._id,
  };
};

export const deleteOtp = async (otpId: string) => {
  await Otp.deleteOne({ _id: otpId });
};

export const deleteOtpByEmailAndType = async (email: string, type: OtpType) => {
  await Otp.deleteMany({ email, type });
};

export const isOtpValid = async ({
  email,
  otp,
  type,
}: IVerifyOtpPayload): Promise<boolean> => {
  const otpRecord = await Otp.findOne({
    email,
    otp,
    type,
    expiresAt: { $gt: new Date() },
  });

  return !!otpRecord;
};
