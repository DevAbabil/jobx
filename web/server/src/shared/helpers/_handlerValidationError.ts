import type mongoose from 'mongoose';
import type { TErrorSources, TGenericErrorResponse } from '@/interface';

export const handlerValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  const errors = Object.values(err.errors);

  errors.forEach((errorObject: any) => {
    errorSources.push({
      path: errorObject.path,
      message: errorObject.message,
    });
  });

  return {
    status: 400,
    message: 'Validation Error',
    errorSources,
  };
};
