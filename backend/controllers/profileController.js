import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

// ⭐ GET MY PROFILE
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate("friends", "name profilePic");

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ⭐ UPDATE PROFILE (name, bio)
export const updateProfile = async (req, res) => {
  try {
    const { name, bio } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, bio },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ⭐ UPDATE PROFILE PICTURE
export const updateProfilePic = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ message: "No image uploaded" });

    // UPLOAD TO CLOUDINARY
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "profile_pictures"
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePic: result.secure_url },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
