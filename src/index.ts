import express, { Express } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import { appConfig } from "./configs";
import { connectDB } from "./configs/connectDB";
import logger from "./configs/logger";
import apiLogger from "./middlewares/apiLogger";
import corsHandler from "./middlewares/corsHandler";
import { errorHandler } from "./middlewares/errorHandler";
import limiter from "./middlewares/rateLimiter";
import setCache from "./middlewares/setCache";
import router from "./routes";

const PORT = appConfig.port;

const app: Express = express();

// reduce fingerprinting
app.disable("x-powered-by");

// middlewares
app.use(apiLogger);
app.use(corsHandler);
// app.enable("trust proxy"); // enable this when using nginx as reverse proxy as it will handle ratelimiting
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(helmet());
app.use(limiter);
app.use(setCache);

// routes
app.use("/api/v1", router);

// error-handler
app.use(errorHandler);

const server = app.listen(PORT, async () => {
  await connectDB();
  logger.info(`Server started on port ${PORT}`);
});

process.on("unhandledRejection", (error: Error) => {
  logger.error("Error: Unhandled Rejection", error.message);
});

process.on("SIGINT", () => {
  server.close(() => {
    logger.warn("Server closed!!!");
    mongoose.connection.close(false).then(() => {
      process.exit(0);
    });
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    logger.warn("Server closed!!!");
    mongoose.connection.close(false).then(() => {
      process.exit(0);
    });
  });
});
