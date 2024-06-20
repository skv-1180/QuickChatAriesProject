import React from "react";
import Feed from "./Feed";
import Navbar from "./Navbar";
import styled from "styled-components";
import ProfileLogo from "../ProfileLogo";

const Home = () => {
  return (
    <HomeContainer>
    <ProfileLogo/>
      <Navbar />
      <Feed />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  ${'' /* background-color: ${({ theme }) => theme.colors.secondary}; */}
  min-height: 100vh;
  ${'' /* background-image: linear-gradient(to right, #a98edb, #52a188);  */}
`;

export default Home;
