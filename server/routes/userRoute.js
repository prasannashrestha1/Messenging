import express from "express";
import {
  getUserProfile,
  login,
  signup,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/:id", getUserProfile);

export default router;
