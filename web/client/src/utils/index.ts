export const extractError = (error: unknown): string | undefined => {
  if (error instanceof Error) return error.message;

  if (typeof error === 'object' && error !== null) {
    const errObj = error as Record<string, { message: string }>;
    if (errObj?.data?.message) return errObj.data.message;
    if (errObj?.message) return errObj?.message?.message;
  }
};
