import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const Private = () => {
  const [auth, setAuth] = useAuth();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const CheckUser = async () => {
      try {
        const res = await axios.get("/api/v1/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        setOk(false);
        // Optionally, handle error here
        console.error("Auth check failed:", error);
      }
    };
    if (auth?.token) {
      CheckUser();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
