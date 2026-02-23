import { useEffect, useState } from "react";
import api from "../utils/api";

function FriendsList() {
  const [friends, setFriends] = useState([]);

  const loadFriends = async () => {
    const res = await api.get("/friends");
    setFriends(res.data);
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <div className="mb-4">
      <h4 className="fw-bold mb-3">Your Friends</h4>

      {friends.length === 0 ? (
        <p className="text-muted">You have no friends yet</p>
      ) : (
        friends.map((friend) => (
          <div
            key={friend._id}
            className="d-flex align-items-center justify-content-between border p-2 mb-2 rounded"
          >
            <div>
              <div className="fw-semibold">{friend.name}</div>
              <div className="text-muted small">{friend.email}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FriendsList;
