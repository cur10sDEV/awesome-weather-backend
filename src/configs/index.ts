import dotenv from "dotenv";
import { defaultConfig } from "./default";

dotenv.config({
  path: [".env", ".env.local"],
});

export const appConfig = {
  port: process.env["PORT"] ?? defaultConfig.port,
  dbURI: process.env["DB_URI"] ?? defaultConfig.dbURI,
  dbName: process.env["DB_NAME"] ?? defaultConfig.dbName,
  appName: process.env["APP_NAME"] ?? defaultConfig.appName,
  env: process.env["NODE_ENV"] ?? defaultConfig.env,
  allowedOrigins: [...defaultConfig.allowedOrigins, process.env["CORS_ORIGIN"] ?? "http://localhost:3000"],
  jwksUri: process.env.JWKS_URI ?? defaultConfig.jwksUri,
};
