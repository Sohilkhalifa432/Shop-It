import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { cartApi } from "../../context/CartContext";
import SearchInput from "./SearchInput";
// Updated SearchInput for modern look

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = cartApi();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    alert("Log Out Successfully !");
  };

  // Nav link classes for modern look
  const navLinkClass =
    "text-white no-underline  tracking-wide font-sans font-medium hover:text-blue-400 transition-colors duration-200";

  return (
    <>
      <header className="bg-[#053f5c] text-white shadow-md w-full">
        <div className="container mx-auto flex items-center justify-between px-3 py-2">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="w-[130px]" />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            <Link to="/" className={navLinkClass}>
              Home
            </Link>
            <Link to="/" className={navLinkClass}>
              Shop
            </Link>
            <Link to="/about" className={navLinkClass}>
              About
            </Link>
            <Link to="/contact" className={navLinkClass}>
              Contact
            </Link>
          </nav>

          {/* Search Input: Desktop */}
          <div className="hidden md:block mx-4 flex-1 max-w-xs">
            <SearchInput />
          </div>

          {/* Icons & Auth */}
          <div className="flex items-center space-x-4 text-lg">
            <Link
              to="/cart"
              className="flex items-center gap-2 font-bold text-blue-400 hover:text-blue-600 transition-colors"
            >
              <i className="fas fa-shopping-cart"></i>
              <span>{cart.length}</span>
            </Link>

            {!auth.user ? (
              <>
                <Link
                  to="/register"
                  className="text-white hover:text-blue-400 no-underline font-sans font-medium uppercase  tracking-wide text-md"
                >
                  Register
                </Link>
                <Link
                  to="/Login"
                  className="text-white hover:text-blue-400 no-underline font-sans font-medium uppercase tracking-wide text-md"
                >
                  Log in
                </Link>
              </>
            ) : (
              <>
                <Link
                  onClick={handleLogout}
                  className="text-white hover:text-blue-400 no-underline font-sans font-medium uppercase tracking-wide"
                >
                  Log Out
                </Link>
              </>
            )}
            {/* Hamburger */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden focus:outline-none text-white ml-2"
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-900 pb-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-2 py-4 px-4 text-base">
              <Link
                to="/"
                className={navLinkClass + " py-2"}
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/"
                className={navLinkClass + " py-2"}
                onClick={toggleMobileMenu}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className={navLinkClass + " py-2"}
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={navLinkClass + " py-2"}
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
              {/* Search Input: Mobile */}
              <div className="mt-2">
                <SearchInput />
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
