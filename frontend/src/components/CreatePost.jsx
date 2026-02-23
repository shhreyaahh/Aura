import { useState } from "react";
import api from "../utils/api";

function CreatePost({ onPostCreated, circles }) {
  const [content, setContent] = useState("");
  const [circleId, setCircleId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    await api.post("/posts", {
      text: content,
      visibility: circleId ? "circle" : "public",
      circleId: circleId || null
    });

    setContent("");
    setCircleId("");
    onPostCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <textarea
        id="post-content"
        name="content"
        className="form-control mb-2"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <select
        id="post-circle"
        name="circle"
        className="form-select mb-2"
        value={circleId}
        onChange={(e) => setCircleId(e.target.value)}
      >
        <option value="">🌍 Public</option>
        {circles.map((c) => (
          <option key={c._id} value={c._id}>
            🔒 {c.name}
          </option>
        ))}
      </select>

      <button className="btn btn-primary">Post</button>
    </form>
  );
}

export default CreatePost;
