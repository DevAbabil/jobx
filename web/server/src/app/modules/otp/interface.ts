export enum OtpType {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
}

export interface IOtp {
  _id?: string;
  email: string;
  otp: string;
  type: OtpType;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGenerateOtpPayload {
  email: string;
  type: OtpType;
}

export interface IVerifyOtpPayload {
  email: string;
  otp: string;
  type: OtpType;
}
