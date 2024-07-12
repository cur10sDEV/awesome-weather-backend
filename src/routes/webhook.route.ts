import { userWebhookHandler } from "@/controllers/webhook/users";
import { Router } from "express";

const router = Router();

router.post("/users", userWebhookHandler);

export default router;
