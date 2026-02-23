import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import "./auth.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = useAuthStore((state) => state.register);
  const error = useAuthStore((state) => state.error);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await register(name, email, password);

    if (result.success) {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card shadow-lg">
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button
            className="btn btn-success w-100 rounded-pill mt-2"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="fw-bold text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
