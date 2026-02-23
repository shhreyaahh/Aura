import { useState } from "react";
import api from "../utils/api";
import useAuthStore from "../store/authStore";

function UsernameSetup() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState("");

  // 🔴 SAFETY: if username already exists, NEVER show this screen
  if (user?.username) {
    return null;
  }

  const submit = async () => {
    if (!username.trim()) return;

    try {
      await api.post("/users/set-username", { username });

      // fetch fresh user
      const res = await api.get("/auth/me");
      setUser(res.data.user);

    } catch (err) {
      const msg = err.response?.data?.message;

      // 🔴 CRITICAL FIX:
      // If backend says taken BUT user already has username → exit
      if (msg === "Username already taken") {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
        return;
      }

      alert(msg || "Error");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card p-4" style={{ width: 350 }}>
        <h5 className="fw-bold mb-2">Choose a username</h5>
        <p className="text-muted small">
          This will be used to add friends
        </p>

        <input
          id="username"
          name="username"
          className="form-control mb-3"
          placeholder="username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={submit}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default UsernameSetup;
