import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProfileButton = styled(Link)`
  position: fixed;
  top: 20px;
  right: 20px;
  text-decoration: none;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${'' /* background-color: #007bff; */}
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProfileIcon = styled.img`
  width: 35px;
  height: 35px;
`;

function ProfileLogo() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!userData) {
        navigate("/login");
      } else {
        setCurrentUser(JSON.parse(userData));
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <ProfileButton to="/profile">
      {currentUser && <ProfileIcon src={currentUser.avatarImage} alt="Profile" />}
    </ProfileButton>
  );
}

export default ProfileLogo;
