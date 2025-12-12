import { z } from 'zod';
import { PyamentStatus } from './interface';

export const zPaymentIntentSchema = z.object({
  phone: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
    message: 'Invalid Bangladeshi phone number',
  }),
});

export const zPaymentStatusUpdateSchema = z.object({
  status: z.enum([
    PyamentStatus.SUCCESS,
    PyamentStatus.FAILED,
    PyamentStatus.PENDING,
  ]),
});
