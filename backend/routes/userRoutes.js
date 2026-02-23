import express from "express";

import { searchUsersByName } from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", (req, res) => {
  res.send("User routes working");
});

router.get("/search", protect, searchUsersByName);



export default router;
