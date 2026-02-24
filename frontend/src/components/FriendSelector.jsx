import { useEffect, useState } from "react";
import api from "../utils/api";

export default function FriendSelector({ selected, setSelected }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/friends")
      .then(res => {
        setFriends(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load friends:", err);
        setLoading(false);
      });
  }, []);

  const toggleFriend = (friendId) => {
    if (selected.includes(friendId)) {
      setSelected(selected.filter(id => id !== friendId));
    } else {
      setSelected([...selected, friendId]);
    }
  };

  if (loading) return <p>Loading friends...</p>;
  if (friends.length === 0) return <p className="text-muted">No friends yet</p>;

  return (
    <div style={{ marginBottom: "15px" }}>
      {friends.map(friend => (
        <div key={friend._id} style={{ marginBottom: "10px" }}>
          <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selected.includes(friend._id)}
              onChange={() => toggleFriend(friend._id)}
              style={{ marginRight: "8px", cursor: "pointer" }}
            />
            {friend.name}
          </label>
        </div>
      ))}
    </div>
  );
}
