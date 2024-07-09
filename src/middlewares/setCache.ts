import { appConfig } from "@/configs";
import { NextFunction, Request, Response } from "express";

const setCache = (req: Request, res: Response, next: NextFunction) => {
  // keep cache for five minutes in production
  const period = appConfig.env === "development" ? 0 : 60 * 5;

  // you only want to cache requests
  if (req.method === "GET") {
    res.set("Cache-control", `public, max-age=${period}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", `no-store`);
  }

  next();
};

export default setCache;
