import { Router } from "express";

const router = Router();

router.get("/me", (req, res, next) => {
  res.status(200).json({ msg: "" });
});

export default router;
