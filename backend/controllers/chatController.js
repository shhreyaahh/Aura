import Chat from "../models/Chat.js";
import Circle from "../models/Circle.js";

export const accessChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const { otherUserId } = req.body;

    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [userId, otherUserId] }
    }).populate("users", "name profilePic");

    if (!chat) {
      chat = await Chat.create({
        users: [userId, otherUserId]
      });
    }

    res.json({ success: true, chat });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const accessCircleChat = async (req, res) => {
  try {
    const { circleId } = req.body;

    let chat = await Chat.findOne({ circle: circleId })
      .populate("circle")
      .populate("users", "name profilePic");

    // If no chat exists, create one
    if (!chat) {
      const circle = await Circle.findById(circleId);

      chat = await Chat.create({
        isGroupChat: true,
        circle: circleId,
        users: circle.members
      });
    }

    res.json({ success: true, chat });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
