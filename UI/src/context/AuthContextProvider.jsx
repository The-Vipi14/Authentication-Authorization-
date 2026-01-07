import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/me", { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setIsAuth(true);
          console.log(isAuth);
          console.log(res.data.authenticated);
        } else {
          setIsAuth(false);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
