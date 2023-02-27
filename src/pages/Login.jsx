import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState("");
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const handleChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
    console.log(loginDetails);
  };

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token && context?.isUserLoggedIn) {
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleUserLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginDetails?.username,
          password: loginDetails?.password,
        }),
      });

      const formatRes = await res.json();

      if (!formatRes?.isSuccess) {
        throw new Error(formatRes?.message);
      }

      alert(formatRes?.message);
      localStorage.setItem("token", formatRes?.token);
      if (formatRes?.role === "admin") {
        context?.handleLogin();
        navigate("/adminPanel");
      } else {
        context?.handleLogin();
        navigate("/instructorPanel", { state: { id: formatRes?.id } });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <h2 className="text-center position-absolute w-100">
        Lecture Scheduling Application
      </h2>
      <div
        className="d-flex justify-content-center align-items-center container container-lg-fluid"
        style={{ minHeight: "100dvh", height: "100vh" }}
      >
        <form
          className=" col-lg-5 col-md-5 col-sm-10 "
          onSubmit={(e) => {
            e.preventDefault();

            if (!loginDetails?.username || !loginDetails?.password) {
              alert("Please fill all the details");
            } else {
              handleUserLogin();
            }
          }}
        >
          <div className="loginHeader">
            <h2>Login</h2>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleChange}
              type="text"
              name="username"
              className="form-control"
              id="username"
              placeholder="Username"
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="loginBtn">
            <button className="btn btn-primary w-100">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
