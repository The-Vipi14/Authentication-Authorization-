import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      {" "}
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

export default App;
