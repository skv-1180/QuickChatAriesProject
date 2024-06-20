import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  width: 60%;
  margin: 50px auto;
  padding: 30px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    margin: 20px auto;
    padding: 20px;
  }

  @media (max-width: 480px) {
    width: 95%;
    height: auto;
    margin: 10px auto;
    padding: 10px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ProfileButton = styled(Link)`
  text-decoration: none;
  margin: 10px;
`;

const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionContainer = styled.div`
  flex: 1;
  background: ${props => props.background};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  color: #333;
  margin: 20px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin: 15px;
  }
`;

const SectionDescription = styled.p`
  font-size: 1.3rem;
  color: #555;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: auto;

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

function StartingScreen() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!userData) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(userData));
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <HomeContainer>
      <Header>
        <ProfileButton to="/profile">
          <ProfileIcon src={currentUser && currentUser.avatarImage} alt="Profile" />
        </ProfileButton>
      </Header>
      <MainSection>
        <SectionContainer background="#f0f0f0">
          <SectionTitle>Personal Chat</SectionTitle>
          {/* <SectionDescription>
            Engage in private conversations with your friends and connections.
            Share messages, emojis, and more!
          </SectionDescription> */}
          <StyledLink to="/chat">Go to Chat</StyledLink>
        </SectionContainer>
        <SectionContainer background="#f9f9f9">
          <SectionTitle>News Feed</SectionTitle>
          {/* <SectionDescription>
            Stay updated with the latest posts from people you follow. Like,
            comment, and share your thoughts!
          </SectionDescription> */}
          <StyledLink to="/news">News Feed</StyledLink>
        </SectionContainer>
      </MainSection>
    </HomeContainer>
  );
}

export default StartingScreen;
