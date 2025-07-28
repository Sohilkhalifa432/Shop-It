import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import Layout from "../layout/Layout";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (auth?.user) {
      const { name, email, address, phone, password } = auth.user;
      setName(name || "");
      setEmail(email || "");
      setPassword(password || "");
      setAddress(address || "");
      setPhone(phone || "");
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("https://shop-it-1-9q81.onrender.com/api/v1/auth/update-profile", {
        name,
        email,
        address,
        phone,
        password,
      });
      if (data.success) {
        setAuth({ ...auth, user: data.userProfile });
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: data.userProfile })
        );
        alert("Profile updated successfully!");
        setPassword("");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#053f5c] via-[#429ebd] to-[#9fe7f5]">
        <form
          className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-[#053f5c] mb-2 text-center">
            Update Profile
          </h2>
          <div className="flex flex-col gap-1">
            <label className="text-[#053f5c] font-semibold">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border-2 border-[#9fe7f5] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] focus:outline-none transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#053f5c] font-semibold">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border-2 border-[#f7ad19] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] focus:outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              // disabled // Uncomment to make email readonly
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#053f5c] font-semibold">Password</label>
            <input
              type="password"
              placeholder="Password (leave blank to keep unchanged)"
              className="w-full px-4 py-3 border-2 border-[#9fe7f5] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] focus:outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#053f5c] font-semibold">Address</label>
            <textarea
              rows={3}
              placeholder="Address"
              value={address}
              className="w-full px-4 py-3 border-2 border-[#f7ad19] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] focus:outline-none transition"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[#053f5c] font-semibold">Phone</label>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full px-4 py-3 border-2 border-[#9fe7f5] rounded-lg text-[#053f5c] bg-white focus:border-[#429ebd] focus:outline-none transition"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            className="w-full mt-4 py-3 rounded-lg bg-[#f7ad19] text-[#053f5c] font-bold text-lg hover:bg-[#429ebd] hover:text-white transition"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UserProfile;
