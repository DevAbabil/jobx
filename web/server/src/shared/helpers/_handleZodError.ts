import { TErrorSources, TGenericErrorResponse } from "@/interface";

export const handlerZodError = (err: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [];

  err.issues.forEach((issue: any) => {
    errorSources.push({
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    });
  });

  return {
    status: 400,
    message: "Zod Error",
    errorSources,
  };
};
