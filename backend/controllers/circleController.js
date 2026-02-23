import Circle from "../models/Circle.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import crypto from "crypto";
import mongoose from "mongoose";

// CREATE CIRCLE
export const createCircle = async (req, res) => {
  try {
    const { name, members = [] } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Circle name required" });
    }

    // include admin + selected friends
    const uniqueMembers = [...new Set([req.user.id, ...members])];

    const circle = await Circle.create({
      name,
      admin: req.user.id,
      members: uniqueMembers,
    });

    res.status(201).json(circle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// JOIN CIRCLE USING CODE
export const joinCircle = async (req, res) => {
  try {
    const { inviteCode } = req.body;

    const circle = await Circle.findOne({ inviteCode });
    if (!circle) {
      return res.status(404).json({ message: "Invalid invite code" });
    }

    if (circle.members.includes(req.user.id)) {
      return res.status(400).json({ message: "Already in circle" });
    }

    circle.members.push(req.user.id);
    await circle.save();

    res.status(200).json({ message: "Joined circle successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD FRIEND TO CIRCLE (ADMIN ONLY)
export const addMemberToCircle = async (req, res) => {
  try {
    const { circleId, members } = req.body;

    if (!members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ message: "No members provided" });
    }

    if (!circleId) {
      return res.status(400).json({ message: "Circle ID is required" });
    }

    const circle = await Circle.findById(circleId);
    if (!circle) {
      return res.status(404).json({ message: "Circle not found" });
    }

    // Check if user is admin
    if (circle.admin.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only circle admin can add members" });
    }

    // Convert string IDs to ObjectIds
    const memberObjectIds = members.map(id => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid member ID: ${id}`);
      }
      return new mongoose.Types.ObjectId(id);
    });

    // Use $addToSet to add unique members
    const updatedCircle = await Circle.findByIdAndUpdate(
      circleId,
      { $addToSet: { members: { $each: memberObjectIds } } },
      { new: true }
    );

    res.status(200).json({ 
      message: "Members added successfully",
      circle: updatedCircle
    });
  } catch (error) {
    console.error("Error adding members:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET MY CIRCLES
export const getMyCircles = async (req, res) => {
  try {
    const circles = await Circle.find({
      members: req.user.id,
    }).populate("members", "username email");

    res.status(200).json(circles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const inviteToCircle = async (req, res) => {
  const { circleId, friendId } = req.body;

  const circle = await Circle.findById(circleId);
  if (!circle) return res.status(404).json({ message: "Circle not found" });

  // Only admin can invite
  if (circle.admin.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  // Prevent duplicate members
   if (circle.members.includes(friendId)) {
    return res.status(400).json({ message: "Already in circle" });
  }

  const invite = await FriendRequest.create({
    from: req.user.id,
    to: friendId,
    type: "circle",
    circleId,
    status: "pending",
  });
 
  res.status(201).json(invite);
};