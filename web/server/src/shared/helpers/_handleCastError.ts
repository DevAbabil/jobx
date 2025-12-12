import type mongoose from 'mongoose';
import type { TGenericErrorResponse } from '@/interface';

export const handleCastError = (
  _err: mongoose.Error.CastError
): TGenericErrorResponse => {
  return {
    status: 400,
    message: 'Invalid MongoDB ObjectID. Please provide a valid id',
  };
};
