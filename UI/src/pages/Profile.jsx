import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import axios from "axios";

const Profile = () => {
  const { setIsAuth } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user/profile")
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .post("http://localhost:5000/api/user/logout", {
        withCredentials: true,
      })
      .then(() => setIsAuth(false))
      .catch((data) => console.log(data));
  };

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Profile;
