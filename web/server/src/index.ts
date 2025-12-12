import app from "@/_app";
import DevAbabilServer from "@/_server";
import { connectDB, ENV, IS_VERCEL } from "@/config";
import { runSeed } from "@/shared";

const initDB = async () => {
  await connectDB();
  if (ENV.NODE_ENV === "development") await runSeed();
  return true;
};

(async () => {
  const connected = await initDB();

  if (!IS_VERCEL) {
    const server = new DevAbabilServer();

    if (connected) server.init();

    const gracefulShutdown = async (reason: string) => {
      console.log(`${reason} received, shutting down...`);
      server.shutdown();
    };

    process.on("uncaughtException", (err) =>
      gracefulShutdown("uncaughtException")
    );
    process.on("unhandledRejection", (err) =>
      gracefulShutdown("unhandledRejection")
    );

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } else {
    await initDB();
  }
})();

export default app;
