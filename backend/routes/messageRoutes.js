import express from "express";
import {
  sendMessage,
  getUserMessages,
  getCircleMessages,
} from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", protect, sendMessage);
router.get("/user/:userId", protect, getUserMessages);
router.get("/circle/:circleId", protect, getCircleMessages);

export default router;
