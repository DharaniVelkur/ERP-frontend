import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from '@mui/material/CircularProgress';


const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [spin, setSpin] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("usersdatatoken")) {
      navigate("/dashboard");
    }
  });

  const loginUser = async (e) => {
    setSpin(true);
    e.preventDefault();
    if (email === "" && password === "") {
      setSpin(false);

      alert("Empty fields are not allowed!!");
    } else if (email === "") {
      setSpin(false);

      alert("Please enter Email");
    } else if (!email.includes("@")) {
      setSpin(false);

      alert("Enter valid email");
    } else if (password === "") {
      setSpin(false);

      alert("Enter password");
    } else {
      const data = await fetch("https://erpbackend-959k.onrender.com/login", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": true,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const response = await data.json();
      console.log(response);

      if (response.finduser) {
        setSpin(false);

        if (response.finduser.email === "admin@gmail.com") {
          localStorage.setItem("isAdmin", true);
        }
        localStorage.setItem("usersdatatoken", response.token);
        toast.success("Logged in successfully");
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      } else {
        toast(response.error);
        setSpin(false);
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="className=container d-flex flex-column justify-content-center align-items-center">
      <form className="mt-4 border-info border p-5">
        <h1 className="text-center mt-2 text-danger">Sign In</h1>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            value={email}
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
            {!spin ?
          <button type="submit" className="btn btn-primary" onClick={loginUser}>
            Log In
          </button>:<button type="submit" className="btn btn-primary"><CircularProgress style={{'color': 'white'}} size="1rem"/></button>}
          <p className="pt-4">
            New User?<NavLink to={"/register"}>Sign Up</NavLink>
          </p>
        </div>
      </form>
      <div className="mt-5" style={{ backgroundColor: "yellow" }}>
        <p>For admin : Email address : admin@gmail.com</p>
        <p>password: 123456</p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
