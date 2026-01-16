import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { useEffect } from "react";

const Login = () => {
  const { isAuth, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    });
    // const res = await fetch("http://localhost:5000/api/user/login", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    //   credentials: "include",
    // });

    const data = await res.json();
    resetForm();
  };

  return (
    <>
      <h1>{isAuth}</h1>
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-red-200 to-pink-200">
        <form
          className="bg-white shadow-xl rounded-2xl p-10 flex flex-col gap-6 w-full max-w-md"
          onSubmit={handleLogin}
        >
          <h1 className="text-2xl font-bold text-center text-pink-600">
            Login
          </h1>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Login
          </button>
          <Link className="ml-30 text-blue-500" to={"/register"}>
            create new account
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
