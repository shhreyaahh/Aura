import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriends,
  acceptCircleInvite
} from "../controllers/friendController.js";

const router = express.Router();

router.post("/request/:userId", protect, sendFriendRequest);
router.post("/accept/:userId", protect, acceptFriendRequest);
router.post("/reject/:userId", protect, rejectFriendRequest);
router.get("/requests", protect, getFriendRequests);
router.get("/", protect, getFriends);
router.post("/accept-circle/:id", protect, acceptCircleInvite);



export default router;
