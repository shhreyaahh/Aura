import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    isGroupChat: { type: Boolean, default: false },

    // For 1–1 chat
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // For circle chat
    circle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
      default: null
    },

    // Last message preview
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
