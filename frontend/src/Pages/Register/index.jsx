import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Register() {
  const [orgName, setOrgName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        orgName,
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/employees");
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="register-form-container">
      <h1 className="main-heading">Human Resource Management System</h1>

      <form className="form-container" onSubmit={handleRegister}>
        <h1 className="login-heading">Register Organisation</h1>

        <div className="input-container">
          <label className="input-label" htmlFor="orgName">ORGANISATION NAME</label>
          <input
            id="orgName"
            type="text"
            className="input-field"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            placeholder="Enter your organisation name"
            required
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="name">ADMIN NAME</label>
          <input
            id="name"
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter admin name"
            required
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
        </div>

        <div className="input-container">
          <label className="input-label" htmlFor="password">PASSWORD</label>
          <input
            id="password"
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="login-button">Register</button>

        {showError && <p className="error-message">{errorMsg}</p>}
      </form>

      <div>
        <p>
          Already have an account?{" "}
          <span className="register-text" onClick={() => navigate("/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
