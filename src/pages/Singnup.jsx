import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
// import axios from "axios";
import axiosInstance from "../services";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignUp = async (e) => {
    e.preventDefault();

    await axiosInstance
      .post(
        "http://localhost:5001/user/signup",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          enqueueSnackbar(
            "Sign up successful! Please check your email to verify your account.",
            { variant: "success" }
          );
          navigate("/verify-notification");
        } else {
          enqueueSnackbar(response.data.message || "Signup failed.", {
            variant: "error",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar("An error occurred during signup.", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="mx-4 my-4">Sign Up</h1>
      <div className="p-4">
        <form onSubmit={handleSignUp}>
          <div className="my-4">
            <label className="mx-3 mr-4">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2"
              required
            />
          </div>
          <div className="my-4">
            <label className="mx-3 mr-4">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2"
              required
            />
          </div>
          <div className="my-4">
            <label className="mx-3 mr-4">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2"
              required
            />
          </div>
          <button
            className="btn btn-primary mx-4 my-2 p-2"
            style={{ width: 300 }}
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div>
          <p className="mx-4">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
