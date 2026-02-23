import Post from "../models/Post.js";
import Circle from "../models/Circle.js";
import User from "../models/User.js";



// CREATE POST
export const createPost = async (req, res) => {
  try {
    const { text, media, visibility, circleId } = req.body;

    if (visibility === "circle") {
      if (!circleId) {
        return res.status(400).json({ message: "Circle ID required" });
      }

      const circle = await Circle.findById(circleId);
      if (!circle) {
        return res.status(404).json({ message: "Circle not found" });
      }

      if (!circle.members.includes(req.user.id)) {
        return res.status(403).json({ message: "Not a circle member" });
      }
    }

    const post = await Post.create({
      user: req.user.id,
      text,
      media,
      visibility,
      circle: visibility === "circle" ? circleId : null,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET FEED (PUBLIC + USER CIRCLES)
export const getFeed = async (req, res) => {
  try {
    // Find circles the user is a member of
    const userCircles = await Circle.find({ members: req.user.id }).select('_id');

    const circleIds = userCircles.map(circle => circle._id);

    const posts = await Post.find({
      $or: [
        { visibility: "public" },
        { user: req.user.id },
        { visibility: "circle", circle: { $in: circleIds } },
      ],
    })
      .populate("user", "username")
      .populate("circle", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET POSTS OF A CIRCLE
export const getCirclePosts = async (req, res) => {
  try {
    const { circleId } = req.params;

    const posts = await Post.find({
      circle: circleId,
      visibility: "circle",
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LIKE / UNLIKE POST
export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD COMMENT
export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      text,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
