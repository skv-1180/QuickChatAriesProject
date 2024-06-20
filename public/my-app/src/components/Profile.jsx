import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { profileRoute } from "../utils/APIRoutes";
import Avatar from "./Avatar";
import Logout from "./Logout";

function Profile() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    avatarImage: "",
  });
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (!user) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(user);
      setUsername(parsedUser.username);
      setContact({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        avatarImage: parsedUser.avatarImage,
      });
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
    setContact((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName } = contact;
    try {
      const { data } = await axios.post(profileRoute, {
        username,
        firstName,
        lastName,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        toast.success(data.msg, toastOptions);
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(
        "Failed to update profile. Please try again later.",
        toastOptions
      );
    }
  };

  return (
    <div className="container">
      <Avatar img={contact.avatarImage} />
      <h1>Hello {username}</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="firstName"
          value={contact.firstName}
          placeholder="First Name"
          required
          minLength="3"
        />
        <input
          onChange={handleChange}
          type="text"
          name="lastName"
          value={contact.lastName}
          placeholder="Last Name"
          required
          minLength="3"
        />
        <button>Update</button>
      </form>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Logout />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profile;
