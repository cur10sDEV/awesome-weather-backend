import { Request } from "express";
import { HttpStatusCode } from "./httpCodes";

interface ReqWithUser extends Request {
  userId?: string;
}

export { HttpStatusCode, ReqWithUser };
