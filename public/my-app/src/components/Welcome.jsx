import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
    const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [avatarImage, setAvatar] = useState("");

  useEffect(() => {
    const fetchUser =  () => {
      const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!userData) {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchUserName = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if(data){
          setUserName(data.username);
          setAvatar(data.avatarImage);
      }
    };
  
    fetchUserName();
  }, []);
  
  return (
    <Container>
      <img src={avatarImage} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  
  img {
    height: 10rem;
  }
`;