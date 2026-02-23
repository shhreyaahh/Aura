import User from "../models/User.js";

export const searchUsersByName = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query required" });
    }

    const users = await User.find({
      name: { $regex: q, $options: "i" },
      _id: { $ne: req.user._id } // exclude self
    }).select("_id name email profilePic");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

