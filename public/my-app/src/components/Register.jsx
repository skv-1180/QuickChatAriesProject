import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
  const seed = Math.floor(Math.random() * 10000);
  const api = `https://api.multiavatar.com/${seed}.svg`;
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    username: "",
    email: "",
    password: "", 
    confirmPassword: "",
    avatarImage: api,
  });
 
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/startscreen");
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = contact;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error(
        "Password should be equal or greater than 5 characters.",
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
        const { email, username, password ,avatarImage} = contact;
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
          avatarImage,
        });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem(
            process.env.REACT_APP_LOCALHOST_KEY,
            JSON.stringify(data.user)
          );
          navigate("/startscreen");
        }
    } else {
    }
  };

  return (
    <div className="container">
      <h1>Hello {contact.username}</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text" 
          name="username"
          value={contact.username}
          placeholder="Username"
        />
        <input
          onChange={handleChange}
          type="email"
          name="email"
          value={contact.email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={contact.password}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={contact.confirmPassword}
          placeholder="Confirm Password"
        />

        <button onSubmit={handleSubmit}>Register</button>
      </form>
      <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
      <ToastContainer />
    </div>
  );
}

export default Register;
