import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostForm from './PostForm';
import Post from './Post';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const addPost = async (post) => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', post);
      setPosts([...posts,response.data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <FeedContainer>
      <PostForm addPost={addPost} />
      {posts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </FeedContainer>
  );
};
const FeedContainer = styled.div`
  margin: auto;
  
`;

export default Feed;
