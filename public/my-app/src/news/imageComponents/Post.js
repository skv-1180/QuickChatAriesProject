import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const navigate = useNavigate();

  const handleView = () => navigate(`/postfile/${post._id}`);

  return (
    <PostContainer>
      <ImageContainer>
        <img src={`http://localhost:5000/${post.imageUrl}`} alt='Image' />
      </ImageContainer>
      <Content>
        <p>{post.description}</p>
      </Content>
      <Actions>
        <button onClick={handleView}><FaEye /></button>
      </Actions>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 5px #ccc;
  padding: 10px;
  width: 250px;
  height: 300px; 
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  flex: 0 0 70%; /* Takes up 70% of the height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 7px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  flex: 0 0 10%; /* Takes up 20% of the height */
  color: #000;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem; /* Adjust font size as needed */
  margin: 10px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto; /* Enable scrolling for overflowed content */

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const Actions = styled.div`
  flex: 0 0 10%; /* Takes up 10% of the height */
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 1rem;

    svg {
      margin-right: 5px; /* Adjust margin as needed */
    }
  }
`;

export default Post;
