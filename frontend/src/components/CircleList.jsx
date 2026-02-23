import { useState } from "react";
import api from "../utils/api";
import FriendSelector from "./Friend Selector";

function CircleList({ circles, onMembersAdded }) {
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [currentCircle, setCurrentCircle] = useState(null);

  const handleSelectCircle = (circleId) => {
    setCurrentCircle(circleId);
    setSelectedFriends([]); // Reset friends when switching circles
  };

  const addMembers = async () => {
    if (selectedFriends.length === 0) {
      alert("Please select at least one friend");
      return;
    }

    try {
      const response = await api.post("/circles/add-member", {
        circleId: currentCircle,
        members: selectedFriends,
      });

      alert("Members added successfully!");
      setCurrentCircle(null);
      setSelectedFriends([]);
      onMembersAdded && onMembersAdded();
    } catch (err) {
      alert(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  if (!circles || circles.length === 0) {
    return <p className="text-muted">No circles yet</p>;
  }

  return (
    <div className="d-flex flex-column gap-2">
      {circles.map((circle) => (
        <div
          key={circle._id}
          className="border rounded p-3 d-flex justify-content-between align-items-center"
        >
          <div>
            <span className="fw-medium">{circle.name}</span>
            <div className="text-muted small">
              {circle.members?.length || 0} members
            </div>
          </div>

          <button
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleSelectCircle(circle._id)}
          >
            Add Members
          </button>
        </div>
      ))}

      {currentCircle && (
        <div className="card p-3 mt-3">
          <h6>Add Friends to Circle</h6>

          <FriendSelector
            key={currentCircle}
            selected={selectedFriends}
            setSelected={setSelectedFriends}
          />

          <button className="btn btn-success mt-2" onClick={addMembers}>
            Add Selected Friends
          </button>
          
          <button 
            className="btn btn-secondary btn-sm mt-2 ms-2" 
            onClick={() => {
              setCurrentCircle(null);
              setSelectedFriends([]);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default CircleList;
