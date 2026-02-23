import { useEffect, useState } from "react";
import api from "../utils/api";
import socket from "../utils/socket";

import FriendsList from "../components/FriendList";

function Messages() {
  const [friends, setFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  // Load friends (chat list)
  const loadFriends = async () => {
    try {
      const res = await api.get("/friends");
      setFriends(res.data);
    } catch (err) {
      console.error("Failed to load friends", err);
    }
  };

  // Load messages with selected user
  const loadMessages = async (userId) => {
    try {
      const res = await api.get(`/messages/user/${userId}`);
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to load messages", err);
    }
  };

  const selectUser = async (user) => {
  try {
    setSelectedUser(user);

    // create/access chat first
    await api.post("/chats/access", {
      otherUserId: user._id,
    });

    loadMessages(user._id);
  } catch (err) {
    console.error("Chat access failed", err);
  }
};

  const sendMessage = async () => {
    if (!text.trim() || !selectedUser) return;

    try {
      await api.post("/messages/send", {
        receiverId: selectedUser._id,
        type: "user",
        text,
      });

      setText("");
      loadMessages(selectedUser._id);
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  useEffect(() => {
    loadFriends();
  }, []);

  return (
    <div className="row" style={{ height: "70vh" }}>
      {/* LEFT: CHAT LIST */}
      <div className="col-4 border-end">
        <h6 className="fw-bold mb-3">Messages</h6>

        {/* SEARCH FRIENDS */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {friends
          .filter((f) =>
            (f.name || '').toLowerCase().includes(search.toLowerCase())
          )
          .length === 0 ? (
          <p className="text-muted">
            {friends.length === 0 ? "No friends yet" : "No results"}
          </p>
        ) : (
          friends
            .filter((f) =>
              (f.name || '').toLowerCase().includes(search.toLowerCase())
            )
            .map((f) => (
              <div
                key={f._id}
                className={`p-2 rounded mb-1 ${
                  selectedUser?._id === f._id ? "bg-light" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => selectUser(f)}
              >
                {f.name}
              </div>
            ))
        )}
      </div>

      {/* RIGHT: CHAT WINDOW */}
      <div className="col-8 d-flex flex-column">
        {!selectedUser ? (
          <div className="text-muted m-auto">
            👋 Start a conversation
          </div>
        ) : (
          <>
            <div className="border-bottom pb-2 mb-2 fw-semibold">
              Chat with {selectedUser.name}
            </div>

            <div
              className="flex-grow-1 mb-2"
              style={{ overflowY: "auto" }}
            >
              {messages.map((m) => (
                <div key={m._id} className="mb-1">
                  <strong>{m.sender.username}:</strong> {m.text}
                </div>
              ))}
            </div>

            <div className="d-flex gap-2">
              <input
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
              />
              <button className="btn btn-primary" onClick={sendMessage}>
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Messages;
