import { ErrorRequestHandler } from "express";
import { TErrorSources } from "@/interface";
import { ENV } from "@/config";
import * as helper from "@/shared/helpers";
import { AppError } from "@/app/errors";

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  next
) => {
  let errorSources: Array<TErrorSources> = [];
  let status = 500;
  let message = "Something Went Wrong!!";

  //Duplicate error
  if (err.code === 11000) {
    const simplifiedError = helper.handlerDuplicateError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
  }

  // Object ID error / Cast Error
  else if (err.name === "CastError") {
    const simplifiedError = helper.handleCastError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
  } else if (err.name === "ZodError") {
    const simplifiedError = helper.handlerZodError(err);
    status = simplifiedError.status;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as Array<TErrorSources>;
  }

  //Mongoose Validation Error
  else if (err.name === "ValidationError") {
    const simplifiedError = helper.handlerValidationError(err);
    status = simplifiedError.status;
    errorSources = simplifiedError.errorSources as Array<TErrorSources>;
    message = simplifiedError.message;
  } else if (err instanceof AppError) {
    status = err.status;
    message = err.message;
  } else if (err instanceof Error) {
    status = 500;
    message = err.message;
  }

  res.status(status).json({
    success: false,
    message,
    errorSources,
    err:
      ENV.NODE_ENV === "development"
        ? (() => {
            const { stack, ...rest } = err;
            return rest;
          })()
        : null,
    stack: ENV.NODE_ENV === "development" ? err.stack?.split("\n") : null,
  });
};
