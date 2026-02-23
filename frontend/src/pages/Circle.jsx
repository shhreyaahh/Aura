import { useEffect, useState } from "react";
import api from "../utils/api";
import CreateCircle from "../components/CreateCircle";
import CircleList from "../components/CircleList";

function Circle() {
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadCircles = async () => {
    try {
      const res = await api.get("/circles/my");
      setCircles(res.data);
    } catch (err) {
      console.error("Failed to load circles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCircles();
  }, []);

  return (
    <div>
      <h4 className="mb-4 fw-bold">My Circles</h4>

      {/* Create Circle */}
      <div className="card mb-4">
        <div className="card-body">
          <CreateCircle onCreated={loadCircles} />
        </div>
      </div>

      {/* Circle List */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <p className="text-muted">Loading circles...</p>
          ) : (
            <CircleList circles={circles} onMembersAdded={loadCircles} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Circle;
