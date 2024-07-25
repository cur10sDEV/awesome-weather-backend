import { appConfig } from "@/configs";
import { UserService } from "@/services/user.service";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { HttpStatusCode } from "@/utils/httpCodes";
import { RequestHandler } from "express";
import { Webhook } from "svix";
import { generateFromEmail } from "unique-username-generator";

export const userWebhookHandler: RequestHandler = async function (req, res, next) {
  const WEBHOOK_SECRET = appConfig.clerkWebhookSecretKey;
  if (!WEBHOOK_SECRET) {
    throw new ApiError(HttpStatusCode.UNAUTHORIZED, "Unauthorized", [
      { type: "ENV", message: "You need a WEBHOOK_SECRET in your .env" },
    ]);
  }

  // Grab the headers and body
  const headers = req.headers;
  const payload = req.body;

  // Get the Svix headers for verification
  const svix_id = headers["svix-id"] as string;
  const svix_timestamp = headers["svix-timestamp"] as string;
  const svix_signature = headers["svix-signature"] as string;

  // If there are missing Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw new ApiError(HttpStatusCode.BAD_REQUEST, "Error - No Svix Headers");
  }

  // Initiate Svix
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err: any) {
    next(new ApiError(HttpStatusCode.BAD_REQUEST, "Webhook failed to verify!"));
  }

  // Grab the TYPE of the Webhook
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username } = evt.data;

    const user = await UserService.createUser({
      clerkId: id,
      username: username ?? generateFromEmail(email_addresses[0].email_address, 3),
      email: email_addresses[0].email_address,
      avatar: image_url,
    });

    return res
      .status(HttpStatusCode.OK)
      .json(new ApiResponse(HttpStatusCode.CREATED, "User registered successfully!", { user }));
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, image_url, username } = evt.data;

    const user = await UserService.updateUser({
      clerkId: id,
      username: username ?? generateFromEmail(email_addresses[0].email_address, 3),
      email: email_addresses[0].email_address,
      avatar: image_url,
    });

    return res
      .status(HttpStatusCode.OK)
      .json(new ApiResponse(HttpStatusCode.OK, "User updated successfully!", { user }));
  }

  if (eventType === "user.deleted") {
    const id = evt.data.id;

    const isDeleted = await UserService.deleteUser(id);

    if (!isDeleted) {
      return next(new ApiError(HttpStatusCode.INTERNAL_SERVER_ERROR, "Failed to delete the user!"));
    }

    return res.status(HttpStatusCode.OK).json(new ApiResponse(HttpStatusCode.OK, "User deleted successfully!"));
  }
  return res.status(HttpStatusCode.OK).json(new ApiResponse(HttpStatusCode.OK, "Webhook recieved!"));
};
