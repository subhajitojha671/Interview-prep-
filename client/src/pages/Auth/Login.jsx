import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
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
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center font-body">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .font-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <span className="w-9 h-9 rounded-lg bg-[#34D399]/10 flex items-center justify-center mb-4">
        <LuSparkles size={16} className="text-[#34D399]" />
      </span>

      <h3 className="font-display text-2xl font-semibold text-[#0E1116]">
        Welcome back
      </h3>

      <p className="text-sm text-[#5B6472] mt-1 mb-6">
        Enter your details to keep practicing where you left off.
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
          <p className="text-[#FF6B4A] text-sm pb-1 -mt-1">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#0E1116] text-sm font-semibold text-white px-6 py-3 rounded-full hover:bg-[#1c2230] transition-colors cursor-pointer mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#34D399] focus-visible:ring-offset-2"
        >
          Log in
        </button>

        <p className="text-[13px] text-[#5B6472] mt-2 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="font-semibold text-[#34D399] hover:text-[#28b981] underline underline-offset-2 cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;