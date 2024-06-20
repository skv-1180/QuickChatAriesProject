import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    username: "",
    password: "", 
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
    const { password, username} = contact;
    if (username === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
        const { username, password } = contact;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
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
          min="3"
        />
        <input 
          type="password"
          onChange={handleChange}
          name="password"
          value={contact.password}
          placeholder="Password"
        />
        <button onSubmit={handleSubmit}>Login</button>
      </form>
        <span> Don't have an account ? <Link to="/register">Register</Link></span>
      <ToastContainer />
    </div>
  );
}

export default Login;
