import { CorsOptions } from "cors";
import { ENV } from "./_env.config";

export const allowedOrigins = ENV.WHITE_LIST_ORIGIN.split(",").map((origin) =>
  origin.trim()
);

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};
