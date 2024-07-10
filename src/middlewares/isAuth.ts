import { appConfig } from "@/configs";
import { HttpStatusCode } from "@/types";
import { ApiError } from "@/utils/apiError";
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
        { type: "Invalid Request", message: "Authorization token not present!" },
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

    jwt.verify(token, getKey, {}, function (err, decoded) {
      // TODO: check for the user in database and then set proper properties to req object else
      // throw error
    });

    next();
  } catch (error) {
    next(error);
  }
};
