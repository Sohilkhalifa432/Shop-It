import React from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#053f5c] via-[#429ebd] to-[#9fe7f5] py-12">
        {/* Camera Illustration */}
        <div className="mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect
              x="10"
              y="35"
              width="100"
              height="60"
              rx="12"
              fill="#f7ad19"
            />
            <rect x="30" y="55" width="60" height="40" rx="20" fill="#053f5c" />
            <circle
              cx="60"
              cy="75"
              r="18"
              fill="#9fe7f5"
              stroke="#429ebd"
              strokeWidth="4"
            />
            <rect x="45" y="25" width="30" height="20" rx="8" fill="#429ebd" />
            <circle cx="60" cy="75" r="8" fill="#053f5c" />
          </svg>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-2 drop-shadow">
          404
        </h1>
        <h2 className="text-2xl font-bold text-[#f7ad19] mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-white/90 mb-6 text-center max-w-md">
          Looks like you tried to focus on a page that’s out of frame.
          <br />
          Let’s get you back to capturing great moments!
        </p>
        <Link
          to="/"
          className="inline-block bg-[#f7ad19] text-[#053f5c] font-bold px-8 py-3 rounded-lg shadow hover:bg-[#429ebd] hover:text-white transition"
        >
          Go to Homepage
        </Link>
        {/* Optional: Search bar for helpful navigation */}
        {/* <div className="mt-8 w-full max-w-xs">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg border-2 border-[#9fe7f5] focus:border-[#429ebd] outline-none"
          />
        </div> */}
      </div>
    </Layout>
  );
};

export default PageNotFound;
