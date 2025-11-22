import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      navigate("/employees");
    } catch (error) {
      setShowError(true);
      setErrorMsg(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-form-container">
      <h1 className="main-heading">Human Resource Management System</h1>
      <form className="form-container" onSubmit={handleLogin}>
        <h1 className="login-heading">Login</h1>

        <div className="input-container">
          <label className="input-label" htmlFor="email">USERNAME</label>
          <input
            id="email"
            type="text"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
          />
        </div>

        <button type="submit" className="login-button">Login</button>

        {showError && <p className="error-message">{errorMsg}</p>}
      </form>

      <div>
        <p>
          Don't have an account?{" "}
          <span className="register-text" onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
