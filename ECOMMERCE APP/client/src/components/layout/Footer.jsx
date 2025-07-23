import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#053f5c] text-white py-6 w-full mt-auto">
      <div className="container mx-auto flex flex-col items-center">
        <p className="text-center font-sans font-medium tracking-wide mb-1">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-[#f7ad19]">Your Company Name</span>. All rights
          reserved.
        </p>
        <p className="text-center text-[#9fe7f5] font-sans text-sm mb-2">
          Follow us on social media:
        </p>
        <div className="flex justify-center space-x-6 text-2xl">
          <a
            href="#"
            className="text-white hover:text-[#429ebd]"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="#"
            className="text-white hover:text-[#429ebd]"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-white hover:text-[#429ebd]"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
