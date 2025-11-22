import { Link, useNavigate } from "react-router-dom";
import "./index.css";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="navbar-logo">HRMS</h2>
      </div>

      <div className="navbar-right">
        <Link to="/employees" className="nav-link">
          Employees
        </Link>

        <Link to="/teams" className="nav-link">
          Teams
        </Link>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
