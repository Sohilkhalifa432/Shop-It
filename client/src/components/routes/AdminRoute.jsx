import axios from "axios";
import { useAuth } from "../../context/authContext";
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import Spinner from "../Spinner";
const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const CheckUser = async () => {
      const { data } = await axios.put("https://shop-it-1-9q81.onrender.com/api/v1/auth/update-profile", {
      const res = await axios.get("https://shop-it-1-9q81.onrender.com//api/v1/auth/admin", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });


      if (res.data.ok || res.data.user.role === "1") {
        setOk(true);
      } else {
        setOk(false);
        navigate("/login", {
          state: { from: location },
        });
      }
    };
    if (auth?.token) {
      CheckUser();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default AdminRoute;
