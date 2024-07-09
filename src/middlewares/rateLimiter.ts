import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
  statusCode: 429,
  // store: ... , // Use an external store for consistency across multiple server instances.
});

export default limiter;
