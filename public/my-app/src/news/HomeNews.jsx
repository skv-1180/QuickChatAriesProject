// src/components/NewsPage.js
import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 1.8rem;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  transition: color 0.3s ease;

  &:hover {
    color: #0056b3;
  }
`;

const NewsContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #666;
`;

function NewsPage() {
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
    <Container>
      <Title>News Page</Title>
      <List>
        <ListItem>
          <LinkStyle to="/textNews">Regular Posts</LinkStyle>
          <NewsContent>
            Regular posts feature text-based content that allows users to
            share their thoughts, ideas, and updates. Users can engage by
            commenting and liking posts, fostering meaningful discussions.
          </NewsContent>
        </ListItem>
        <ListItem>
          <LinkStyle to="/imageNews">Image Posts</LinkStyle>
          <NewsContent>
            Image posts enable users to share visual content such as
            photographs, illustrations, or infographics. They provide a
            visually engaging way to convey information and stories to
            viewers.
          </NewsContent>
        </ListItem>
        <ListItem>
          <LinkStyle to="/videoNews">Video Posts</LinkStyle>
          <NewsContent>
            Video posts allow users to share dynamic content through videos.
            They are effective for demonstrations, tutorials, storytelling,
            and more, offering an immersive viewing experience.
          </NewsContent>
        </ListItem>
      </List>
    </Container>
  );
}

export default NewsPage;
