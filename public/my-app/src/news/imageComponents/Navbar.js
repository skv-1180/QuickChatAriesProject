import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Nav>
      <h1>NewsFeed</h1>
    </Nav>
  );
};

const Nav = styled.nav`
  ${'' /* background-color: ${({ theme }) => theme.colors.primary}; */}
  color: white;
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    margin: 0;
    font-weight: bold;
  }
`;

export default Navbar;
