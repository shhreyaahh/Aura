import { useEffect, useState } from "react";
import api from "../utils/api";

function FriendRequests() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    const res = await api.get("/friends/requests");
    setRequests(res.data);
  };

  const accept = async (id) => {
    await api.post(`/friends/accept/${id}`);
    loadRequests();
  };

  const reject = async (id) => {
    await api.post(`/friends/reject/${id}`);
    loadRequests();
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div>
      <h4 className="fw-bold mb-3">Friend Requests</h4>

      {requests.length === 0 ? (
        <p className="text-muted">No requests</p>
      ) : (
        requests.map((user) => (
          <div
            key={user._id}
            className="d-flex justify-content-between align-items-center border p-2 mb-2 rounded"
          >
            <div>
              <div className="fw-semibold">{user.name}</div>
              <div className="text-muted small">{user.email}</div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-success btn-sm"
                onClick={() => accept(user._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => reject(user._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FriendRequests;
