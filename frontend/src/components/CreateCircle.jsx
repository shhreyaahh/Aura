import { useState } from "react";
import api from "../utils/api";
import FriendSelector from "./Friend Selector";

function CreateCircle({ onCreated }) {
  const [name, setName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);

      await api.post("/circles/create", {
        name,
        members: selectedFriends,
      });

      setName("");
      setSelectedFriends([]);
      onCreated && onCreated();

    } catch (err) {
      console.error("Create circle failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h6 className="fw-semibold mb-2">Create a new circle</h6>

      <input
        className="form-control mb-2"
        placeholder="Circle name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <FriendSelector
        selected={selectedFriends}
        setSelected={setSelectedFriends}
      />

      <button className="btn btn-primary btn-sm mt-2" disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

export default CreateCircle;
