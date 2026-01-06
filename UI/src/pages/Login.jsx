import React, { useState } from "react";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("http://localhost:5000/api/user/login", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   });

  //   const data = await res.json();

  //   alert(data.message);
  //   console.log(data);
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials:"include"
    });

    const data = await res.json();

    alert(data.message);
    console.log(data);
  };

  return (
    <>
      <div className="h-screen w-full flex justify-center items-center flex-col gap-10 bg-red-400">
        <h1>Login form</h1>
        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          <div className="flex-col flex gap-1 text-2xl">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="h-10 border-0 outline-0 rounded-xl bg-yellow-100 text-gray-700 p-4 "
            />
          </div>
          <div className="flex-col flex gap-1 text-2xl">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 border-0 outline-0 text-2xl  rounded-2xl bg-yellow-100 text-gray-700 p-4"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 h-10 rounded-2xl"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
