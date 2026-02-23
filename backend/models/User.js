import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    username: {
  type: String,
  unique: true,
  sparse: true,
  lowercase: true,
  trim: true
},


    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },

    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    circles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Circle" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);
