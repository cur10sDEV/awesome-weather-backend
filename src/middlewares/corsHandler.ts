import { appConfig } from "@/configs";
import { HttpStatusCode } from "@/types";
import { ApiError } from "@/utils/apiError";
import cors from "cors";

const corsHandler = cors({
  origin: (origin, next) => {
    // allow requests with no origin like curl,postman and mobile apps
    if (!origin) {
      next(null, true);
    } else if (appConfig.allowedOrigins.indexOf(origin) === -1) {
      next(new ApiError(HttpStatusCode.FORBIDDEN, "Origin not allowed!"), false);
    } else {
      next(null, true);
    }
  },
  credentials: true,
});

export default corsHandler;
