import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

import UsernameSetup from "../components/UsernameSetup";


function MainLayout({ children }) {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

 // if (user && !user.username) {
  //return <UsernameSetup />;
 // }

  return (
    <div>
      
      {/* NAVBAR */}
      <div className="border-bottom bg-white">
        <div className="container-fluid d-flex align-items-center justify-content-between py-3">

          {/* Left: Logo */}
          <Link to="/home" className="text-decoration-none">
            <h5 className="fw-bold mb-0 text-primary">Aura</h5>
          </Link>

          {/* Center: Navigation */}
          <div className="d-flex gap-4">
            <Link to="/home" className="text-decoration-none fw-medium text-dark">
              Home
            </Link>
            <Link to="/circles" className="text-decoration-none fw-medium text-dark">
              Circles
            </Link>
            <Link to="/messages" className="text-decoration-none fw-medium text-dark">
              Messages
            </Link>
            <Link to="/friends" className="text-decoration-none fw-medium text-dark">
              Friends
            </Link>
          </div>

          {/* Right: Search + User + Logout */}
          <div className="d-flex align-items-center gap-3">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Search..."
              style={{ width: "180px" }}
            />

            {user && (
              <span className="fw-semibold text-muted">
                Hi, {user.name}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="container mt-4">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
