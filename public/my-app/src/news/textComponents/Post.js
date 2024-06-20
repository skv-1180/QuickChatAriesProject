import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaComment, FaShare, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleView = () => navigate(`/posts/${post._id}`);

  return (
    <PostContainer>
      <div className="content">
        <p>{post.content}</p>
      </div>
      <div className="actions">
        <button onClick={handleView}><FaEye /></button>
      </div>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  background: #fff;
  border-radius: 7px;
  box-shadow: 0 2px 5px #ccc;
  padding: 10px;
  width: 260px;
  height: 300px; /* Increased height to accommodate comments */
  margin: 20px;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    color: #000000;
    font-family: "Montserrat", sans-serif;
    font-size: 1.2rem;
    margin: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: auto; /* Enable scrolling for overflowed content */
    flex: 1; /* Allow content to take up available space */

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
  }

  .actions {
    display: flex;
    justify-content: space-between;
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
  }

  .comments {
    margin-top: 10px;
    textarea {
      width: 100%;
      height: 50px;
      margin-top: 10px;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 5px;
    }

    p {
      background: #f1f1f1;
      padding: 5px;
      border-radius: 5px;
      margin-top: 5px;
    }
  }
`;

export default Post;
