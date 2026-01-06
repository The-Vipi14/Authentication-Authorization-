import React, { useEffect, useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    console.log(res);

    const data = await res.json();

    console.log(data);
    // setData(data);

    alert(data.message);
  };

  return (
    <div
      className="h-screen w-full
      flex justify-center  items-center
    "
    >
      <form
        onSubmit={handleSubmit}
        className=" bg-blue-200 h-100  flex flex-col w-200 p-10 gap-6"
      >
        <h1>signup form</h1>
        <div className=" flex flex-col">
          <label htmlFor="username">username</label>
          <input
            className="bg-yellow-50"
            type="text"
            id="username"
            placeholder="enter you name here..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="email">email</label>
          <input
            className="bg-yellow-50"
            type="email"
            id="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="password">password</label>
          <input
            className="bg-yellow-50"
            type="passsword"
            id="password"
            placeholder="enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Signup;
