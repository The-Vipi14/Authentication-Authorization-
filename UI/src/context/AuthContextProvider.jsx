
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/me", { withCredentials: true })
      .then(setIsAuth(true))
      .then(setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
