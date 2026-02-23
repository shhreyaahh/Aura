import { useEffect, useState } from "react";
import api from "../utils/api";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Home() {
  const [circles, setCircles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  const [requests, setRequests] = useState([]);


  // Load posts
  const loadPosts = async () => {
    try {
      const res = await api.get("/posts/feed");
      setPosts(res.data);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  // Load circles
  const loadCircles = async () => {
    try {
      const res = await api.get("/circles/my");
      setCircles(res.data);
      console.log("Circles loaded:", res.data);
    } catch (err) {
      console.error("Error loading circles:", err);
    }
  };

  useEffect(() => {
    loadPosts();
    loadCircles();
  }, []);

  const toggleLike = async (postId) => {
    await api.put(`/posts/${postId}/like`);
    loadPosts();
  };

  const addComment = async (postId, text) => {
    await api.post(`/posts/${postId}/comment`, { text });
    loadPosts();
  };

  return (
    <div className="w-100 d-flex flex-column">

      {/* CREATE POST */}
      <CreatePost
        circles={circles}
        onPostCreated={loadPosts}
      />

      {/* FEED */}
      <div className="feed-container">
        {posts.length === 0 ? (
          <p className="text-muted text-center mt-5">No posts yet</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={toggleLike}
              onComment={addComment}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
