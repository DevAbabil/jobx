import type { Types } from 'mongoose';

export enum PyamentStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FILED = 'FILED',
}

export interface IPayment {
  txrn_id: string;
  amout: number;
  user: Types.ObjectId;
  status: PyamentStatus;
}
