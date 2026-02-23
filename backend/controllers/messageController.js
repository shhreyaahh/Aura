import Message from "../models/Message.js";
import User from "../models/User.js";
import Circle from "../models/Circle.js";

// SEND MESSAGE (USER OR CIRCLE)
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, type, text } = req.body;

    if (!receiverId || !type || !text) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (type === "user") {
      const receiver = await User.findById(receiverId);
      if (!receiver) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    if (type === "circle") {
      const circle = await Circle.findById(receiverId);
      if (!circle) {
        return res.status(404).json({ message: "Circle not found" });
      }

      if (!circle.members.includes(req.user.id)) {
        return res.status(403).json({ message: "Not a circle member" });
      }
    }

    const message = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      type,
      text,
    });

    const fullMsg = await Message.findById(message._id)
  .populate("sender", "username");

res.status(201).json(fullMsg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER CHAT
export const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      type: "user",
      $or: [
        { sender: req.user.id, receiver: userId },
        { sender: userId, receiver: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CIRCLE CHAT
export const getCircleMessages = async (req, res) => {
  try {
    const { circleId } = req.params;

    const circle = await Circle.findById(circleId);
    if (!circle) {
      return res.status(404).json({ message: "Circle not found" });
    }

    if (!circle.members.includes(req.user.id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const messages = await Message.find({
      type: "circle",
      receiver: circleId,
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
