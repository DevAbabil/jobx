export interface ApiError {
  data?: {
    message?: string;
    success?: boolean;
    status?: number;
  };
  status?: number;
}
