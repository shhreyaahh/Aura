import { Link } from "react-router-dom";
import useAuthStore from "../store/authStore";
import "./navbar.css";

function Navbar() {
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <h2 className="logo">Aura</h2>

      <div className="nav-links">
        <Link to="/friends">Friends</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/circles">Circles</Link>
      </div>

      <div className="nav-user">
        {user?.name}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
