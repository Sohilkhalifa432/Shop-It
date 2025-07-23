import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../../context/authContext";
import Layout from "../layout/Layout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (response.data.success) {
        alert("Login Successful!");
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(response.data));
        // Redirect to the page user wanted to visit or default
        const redirectPath = location.state?.from?.pathname || "/";

        navigate(redirectPath);
      } else {
        alert("Something Went Wrong Please Try again");
      }
    } catch (error) {
      alert("Something Went Wrong Please Try again");
    }
  };

  // handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password");
  };

  const inputClass =
    "w-full bg-white text-[#053f5c] border border-blue-600 rounded px-3 py-2 font-sans transition-all duration-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 placeholder:text-blue-300";

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-[#429ebd] rounded-lg border border-blue-600 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-sans tracking-wide">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-white block mb-1 font-sans"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className={inputClass}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-white block mb-1 font-sans"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={inputClass}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-white hover:text-[#053f5c] hover:underline transition-colors duration-200 font-sans text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#053f5c] hover:bg-blue-700 text-white rounded font-semibold font-sans transition-all duration-200"
            >
              Log In
            </button>
          </form>
          <p className="text-center text-white mt-4 font-sans">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-white hover:text-[#053f5c] hover:underline transition-colors duration-200 cursor-pointer"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
