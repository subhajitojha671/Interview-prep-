import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";

const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }


    setError("");

    //Login API Call

   

    try {

      console.log({
        email,
        password,
      });

      // navigate("/dashboard");

    } catch (error) {

      if (error.response && error.response.data.message) {
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
          onChange={setEmail}
          placeholder="john@example.com"
          type="email"
        />

        <Input
          label="Password"
          value={password}
          onChange={setPassword}
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
            SignUp
          </button>

        </p>

      </form>

    </div>
  );
};

export default Login;