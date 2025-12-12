import { randomBytes } from 'node:crypto';
import bcryptjs from 'bcryptjs';
import { AppError } from '@/app/errors';
import { ENV } from '@/config';
import { HTTP_CODE, sendMail } from '@/shared';
import { OtpType, otpService } from '../otp';
import type { IUser } from '../user/interface';
import { User } from '../user/model';

export const signInUser = async ({
  email,
  password,
}: Pick<IUser, 'email' | 'password'>) => {
  const user = (
    await User.findOne({
      email: email,
    })
  )?.toObject() as IUser;

  if (!user) throw new AppError(HTTP_CODE.NOT_FOUND, `User does not exist!`);

  if (!bcryptjs.compareSync(password, user.password))
    throw new AppError(HTTP_CODE.BAD_REQUEST, `Password not correct!`);

  const { password: _, ...res } = user;

  return res;
};

export const signUpUser = async ({
  name,
  email,
  password,
}: Pick<IUser, 'name' | 'email' | 'password'>) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError(
      HTTP_CODE.BAD_REQUEST,
      'User already exists with this email!'
    );
  }

  // Hash password
  const hashedPassword = bcryptjs.hashSync(password, 12);

  // Generate verification token
  const verificationToken = randomBytes(32).toString('hex');

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    verificationToken,
    isVerified: false,
  });

  // Send verification email
  const verificationUrl = `${ENV.FRONTEND_URL}/verify?token=${verificationToken}`;

  await sendMail({
    to: email,
    subject: 'Verify Your Email - JobX',
    template: {
      name: 'email-verification',
      data: {
        name,
        verificationUrl,
      },
    },
  });

  const { password: _, ...res } = user.toObject();
  return res;
};

export const forgotPassword = async ({ email }: { email: string }) => {
  return await otpService.generateOtp({ email, type: OtpType.FORGOT_PASSWORD });
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  return await otpService.verifyOtp({
    email,
    otp,
    type: OtpType.FORGOT_PASSWORD,
  });
};

export const resetPassword = async ({
  email,
  otp,
  password,
}: {
  email: string;
  otp: string;
  password: string;
}) => {
  // Verify OTP first
  const otpVerification = await otpService.verifyOtp({
    email,
    otp,
    type: OtpType.FORGOT_PASSWORD,
  });

  // Find user and update password
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found!');
  }

  // Hash new password
  const hashedPassword = bcryptjs.hashSync(password, 12);

  // Update user password
  user.password = hashedPassword;
  await user.save();

  // Delete the used OTP
  await otpService.deleteOtpByEmailAndType(email, OtpType.FORGOT_PASSWORD);

  return { message: 'Password reset successfully' };
};

export const verifyEmail = async ({ token }: { token: string }) => {
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    throw new AppError(HTTP_CODE.BAD_REQUEST, 'Invalid verification token!');
  }

  if (user.isVerified) {
    throw new AppError(HTTP_CODE.BAD_REQUEST, 'Email already verified!');
  }

  // Update user verification status
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  return { message: 'Email verified successfully' };
};

export const verifyEmailOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  // Verify OTP first
  const otpVerification = await otpService.verifyOtp({
    email,
    otp,
    type: OtpType.EMAIL_VERIFICATION,
  });

  // Find user and update verification status
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(HTTP_CODE.NOT_FOUND, 'User not found!');
  }

  if (user.isVerified) {
    throw new AppError(HTTP_CODE.BAD_REQUEST, 'Email already verified!');
  }

  // Update user verification status
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  // Delete the used OTP
  await otpService.deleteOtpByEmailAndType(email, OtpType.EMAIL_VERIFICATION);

  return { message: 'Email verified successfully' };
};

export const resendOtp = async ({
  email,
  type,
}: {
  email: string;
  type: OtpType;
}) => {
  return await otpService.generateOtp({ email, type });
};
