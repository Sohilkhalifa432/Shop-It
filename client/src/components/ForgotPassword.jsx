import React, { useState } from "react";
import Layout from "./layout/Layout";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res.data.success) {
        alert("Password Resetted");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-white text-[#053f5c] border border-blue-600 rounded px-3 py-2 font-sans transition-all duration-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 hover:border-blue-400 placeholder:text-blue-300";

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-[#429ebd] rounded-lg border border-blue-600 shadow-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-sans tracking-wide">
            Forgot Password
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
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="text-white block mb-1 font-sans"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className={inputClass}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="text-white block mb-1 font-sans"
              >
                What is your favourite color?
              </label>
              <input
                type="text"
                id="answer"
                className={inputClass}
                placeholder="Your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#053f5c] hover:bg-blue-700 text-white rounded font-semibold font-sans transition-all duration-200"
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
