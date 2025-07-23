import { useContext, createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const AuthContenxt = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);

      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
  }, []);

  return (
    <AuthContenxt.Provider value={[auth, setAuth]}>
      {children}
    </AuthContenxt.Provider>
  );
};

const useAuth = () => useContext(AuthContenxt);

export { useAuth, AuthProvider };
