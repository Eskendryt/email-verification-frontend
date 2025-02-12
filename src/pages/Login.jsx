import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import axiosInstance from "../services";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    axiosInstance
      .post("http://localhost:5001/user/signin", { username, password })
      .then((response) => {
        const { token, username } = response.data;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", username);
          enqueueSnackbar("Login successful", { variant: "success" });
          navigate("/home", { state: { username } });
        } else {
          enqueueSnackbar("Invalid login response", { variant: "error" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.response?.data?.message || "Login failed", {
          variant: "error",
        });
        console.error("Login error:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Login</h1>
      <form onSubmit={handleLogin}>
        <div className="my-4">
          <label className="mx-3 mr-3">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2"
          />
        </div>
        <div className="my-4">
          <label className="mx-3 mr-3">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mx-4 my-2"
          style={{ width: 300 }}
        >
          Login
        </button>
      </form>
      <div>
        <p className="mx-4">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
