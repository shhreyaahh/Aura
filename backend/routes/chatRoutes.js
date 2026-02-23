import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat, accessCircleChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/access", protect, accessChat);
router.post("/circle", protect, accessCircleChat);

export default router;
