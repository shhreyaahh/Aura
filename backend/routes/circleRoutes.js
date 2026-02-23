import express from "express";
import {
  createCircle,
  joinCircle,
  addMemberToCircle,
  getMyCircles,
  inviteToCircle,
} from "../controllers/circleController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createCircle);
router.post("/join", protect, joinCircle);
router.post("/add-member", protect, addMemberToCircle);
router.get("/my", protect, getMyCircles);
router.post("/invite", protect, inviteToCircle);


export default router;
