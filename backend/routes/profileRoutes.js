import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  getMyProfile,
  updateProfile,
  updateProfilePic
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/update", protect, updateProfile);
router.put("/profile-pic", protect, upload.single("image"), updateProfilePic);

export default router;
