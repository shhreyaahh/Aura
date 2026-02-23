import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import circleRoutes from "./routes/circleRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// Socket.io imports
import { Server } from "socket.io";
import http from "http";

// Load env
dotenv.config();

const PORT = process.env.PORT || 5000;

// Create express app
const app = express();

// HTTP server for socket.io
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Test endpoint
app.get("/api/test-env", (req, res) => {
  res.json({
    mongo: !!process.env.MONGO_URI,
    jwt: !!process.env.JWT_SECRET,
    cloudinary: !!process.env.CLOUDINARY_KEY
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/circles", circleRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/profile", profileRoutes);

// SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomId).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
