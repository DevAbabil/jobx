import type { Types } from 'mongoose';

export enum PyamentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface IPayment {
  txrn_id: string;
  amount: number;
  user: Types.ObjectId;
  status: PyamentStatus;
}
