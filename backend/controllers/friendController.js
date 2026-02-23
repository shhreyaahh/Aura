import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import Circle from "../models/Circle.js";

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("friends", "name email profilePic");

    res.json(user.friends);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SEND FRIEND REQUEST
export const sendFriendRequest = async (req, res) => {
  try {
    const receiverId = req.params.userId;

    if (receiverId === req.user.id) {
      return res.status(400).json({ message: "Cannot add yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    if (
      receiver.friendRequests.includes(req.user.id) ||
      receiver.friends.includes(req.user.id)
    ) {
      return res.status(400).json({ message: "Already requested or friends" });
    }

    receiver.friendRequests.push(req.user.id);
    await receiver.save();

    res.json({ message: "Friend request sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ACCEPT FRIEND REQUEST
export const acceptFriendRequest = async (req, res) => {
  try {
    const senderId = req.params.userId;

    const user = await User.findById(req.user.id);

    if (!user.friendRequests.includes(senderId)) {
      return res.status(400).json({ message: "No request found" });
    }

    // remove request
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== senderId
    );

    user.friends.push(senderId);

    const sender = await User.findById(senderId);
    sender.friends.push(req.user.id);

    await user.save();
    await sender.save();

    res.json({ message: "Friend request accepted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// REJECT FRIEND REQUEST
export const rejectFriendRequest = async (req, res) => {
  try {
    const senderId = req.params.userId;

    const user = await User.findById(req.user.id);

    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== senderId
    );

    await user.save();

    res.json({ message: "Friend request rejected" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET FRIEND REQUESTS
export const getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("friendRequests", "name email");

    res.json(user.friendRequests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const acceptCircleInvite = async (req, res) => {
  const invite = await FriendRequest.findById(req.params.id);
  if (!invite || invite.type !== "circle") {
    return res.status(404).json({ message: "Invite not found" });
  }

  const circle = await Circle.findById(invite.circleId);
  circle.members.push(invite.to);
  await circle.save();

  invite.status = "accepted";
  await invite.save();

  res.status(200).json(circle);
};
