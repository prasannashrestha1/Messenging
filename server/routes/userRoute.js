import express from "express";
import {
  getUserProfile,
  login,
  signup,
} from "../controllers/userController.js";
import { limiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", limiter, signup);
router.post("/login", limiter, login);
router.get("/:id", getUserProfile);

export default router;
