import { useContext,useEffect } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useContext(AuthContext);
  useEffect(() => {
    console.log(isAuth);
  },[isAuth]);

  if (loading) return <p>loading.....</p>;

  return isAuth ? children  : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
