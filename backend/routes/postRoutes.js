import express from "express";
import {
  createPost,
  getFeed,
  getCirclePosts,
  toggleLike,
  addComment,
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/feed", protect, getFeed);
router.get("/circle/:circleId", protect, getCirclePosts);

router.put("/:postId/like", protect, toggleLike);
router.post("/:postId/comment", protect, addComment);

export default router;
