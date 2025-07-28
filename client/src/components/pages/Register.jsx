import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

const Register = ({ handleRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://shop-it-1-9q81.onrender.com/api/v1/auth/register", {
        name,
        email,
        password,
        address,
        phone,
        answer,
      });
      if (response.data.success) {
        alert(response.data.message);
        navigate("/login");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert("Registration failed!");
      console.log(error);
    }
  };

  const inputClass =
    "w-full bg-[#fff] text-[#053f5c] border border-blue-600 rounded px-3 py-2 transition-colors duration-200 focus:outline-none focus:border-blue-400 hover:border-blue-400 placeholder:text-blue-300";

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-6 bg-[#429ebd] rounded-lg border border-blue-600">
          <h2 className="text-2xl font-semibold text-white text-center mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-white block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className={inputClass}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-white block mb-1">
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
              <label htmlFor="password" className="text-white block mb-1">
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

            <div>
              <label htmlFor="address" className="text-white block mb-1">
                Address
              </label>
              <textarea
                id="address"
                rows={3}
                className={inputClass}
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-white block mb-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                className={inputClass}
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="answer" className="text-white block mb-1">
                What is your favourite color?
              </label>
              <input
                type="text"
                id="answer"
                className={inputClass}
                placeholder="What is your favourite color?"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#053f5c] hover:bg-gray-800  text-white rounded font-semibold transition-colors hover:text-black"
            >
              Register
            </button>
          </form>
          <p className="text-center text-white mt-4">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="underline hover:text-[#053f5c] cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
