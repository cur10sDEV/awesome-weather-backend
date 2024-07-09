import { appConfig } from "@/configs";
import mongoose from "mongoose";
import logger from "./logger";

let isConnected = false;
export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const dbUrl = appConfig.dbURI;
    const dbName = appConfig.dbName;

    if (!dbUrl) {
      throw new Error("Database url not found");
    }

    if (!dbName) {
      throw new Error("Database name not specified");
    }

    if (!isConnected) {
      await mongoose.connect(dbUrl, { dbName });
      isConnected = true;
    }
  } catch (error: any) {
    logger.error("Error Connecting DB");
  }
};

mongoose.connection.on("connected", () => {
  logger.info("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  logger.error(err.message || "Error connecting DB");
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  logger.error("Mongoose disconnected");
});
