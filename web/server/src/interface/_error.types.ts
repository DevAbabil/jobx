export interface TErrorSources {
  path: string;
  message: string;
}

export interface TGenericErrorResponse {
  status: number;
  message: string;
  errorSources?: TErrorSources[];
}
