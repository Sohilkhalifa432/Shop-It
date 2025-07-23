import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router-dom";

const Spinner = () => {
  const [auth, setAuth] = useAuth();
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location=useLocation()

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          navigate("/login",{
            state:location.pathname
          });
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup function
    return () => clearInterval(timer);
  }, [count, navigate,location]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative bg-gray-900 rounded-3xl h-12 w-12 p-8 animate-spin duration-100"></div>
      <h3 className="mt-3 text-xl">Redirecting To You In Just {count}s</h3>
    </div>
  );
};

export default Spinner;
