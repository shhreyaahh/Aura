import { useState } from "react";
import api from "../utils/api";

import FriendRequests from "./FriendRequest";
import FriendsList from "../components/FriendList";



function Friends() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = async () => {
    if (!query.trim()) return;

    const res = await api.get(`/users/search?q=${query}`);
    setResults(res.data);
  };

  const sendRequest = async (id) => {
  try {
    await api.post(`/friends/request/${id}`);
    alert("Friend request sent");
  } catch (err) {
    alert(err.response?.data?.message || "Cannot send request");
  }
};


  return (
    <div>
      <div>
      {/* FRIEND REQUESTS */}
      <FriendRequests />

      <hr className="my-4" />

      {/* FRIENDS LIST */}
      <FriendsList />

      <hr className="my-4" />

      {/* FIND FRIENDS */}
      <h4 className="fw-bold mb-3">Find Friends</h4>

      {/* existing search UI */}
    </div>

      <h4 className="fw-bold mb-3">Find Friends</h4>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary" onClick={search}>
          Search
        </button>
      </div>

      {results.map((user) => (
        <div
          key={user._id}
          className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
        >
          <div>
            <div className="fw-semibold">{user.name}</div>
            <div className="text-muted small">{user.email}</div>
          </div>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => sendRequest(user._id)}
          >
            Add Friend
          </button>
        </div>
      ))}
    </div>
  );
}

export default Friends;
