import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      const response = await axiosInstance.post(
        API_PATHS.AUTH.LOGIN,
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Update user context
        if (updateUser) {
          updateUser(user || response.data);
        }

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-6 flex flex-col justify-center">
      <h3 className="text-2xl font-semibold text-black">
        Welcome Back
      </h3>

      <p className="text-sm text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
          type="email"
        />

        <Input
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && (
          <p className="text-red-500 text-sm pb-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary mt-4"
        >
          Login
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-medium text-amber-500 hover:text-amber-600 underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;