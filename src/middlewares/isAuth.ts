import { appConfig } from "@/configs";
import { UserService } from "@/services/user.service";
import { IClerkSession } from "@/types/clerk";
import { ApiError } from "@/utils/apiError";
import { HttpStatusCode } from "@/utils/httpCodes";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";
import jwksClient from "jwks-rsa";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized!", [
        { type: "Invalid Request", message: "Authorization Header not present!" },
      ]);
    }

    const token = header.split(" ")[1];

    if (!token) {
      throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized!", [
        { type: "Invalid Request", message: "Authorization Token not present!" },
      ]);
    }

    const client = jwksClient({
      jwksUri: appConfig.jwksUri,
    });

    function getKey(header: JwtHeader, callback: SigningKeyCallback) {
      client.getSigningKey(header.kid, function (err, key) {
        var signingKey = key!.getPublicKey();
        callback(err, signingKey);
      });
    }

    jwt.verify(token, getKey, {}, async function (err, decoded) {
      if (err) {
        return res
          .status(HttpStatusCode.UNAUTHORIZED)
          .json(
            new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized!", [
              { type: "Invalid Request", message: "Authorization Token verification failed!" },
            ])
          );
      }

      if (decoded) {
        const decodedToken = decoded as IClerkSession;
        const userData = await UserService.getUserByClerkId(decodedToken.user_id);

        if (!userData || !userData.data) {
          return res
            .status(HttpStatusCode.UNAUTHORIZED)
            .json(
              new ApiError(HttpStatusCode.UNAUTHORIZED, "Invalid Request", [
                { type: "Invalid Request", message: "Authorization Token not valid!" },
              ])
            );
        }

        const user = userData.data;
        req.user = { id: user.id, email: user.email };
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};
