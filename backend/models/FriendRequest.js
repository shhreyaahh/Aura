import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    from: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["friend", "circle"],
      default: "friend"
    },
    circleId: { type: mongoose.Schema.Types.ObjectId, ref: "Circle" },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("FriendRequest", friendRequestSchema);
