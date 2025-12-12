import { model, Schema } from 'mongoose';
import { Collection } from '@/config';
import { type IPayment, PyamentStatus } from './interface';

const paymentSchema = new Schema<IPayment>({
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  txrn_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(PyamentStatus),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const Payment = model(Collection.Payment, paymentSchema);
