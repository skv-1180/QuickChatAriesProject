import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import { FaHeart, FaShareSquare } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileLogo from "../ProfileLogo";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-image: linear-gradient(to right, #a98edb, #52a188);
  }
`;

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/postvideofile/${id}`);
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/postvideofile/${id}/like`);
      setPost(response.data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleValidation = () => {
    if (newComment.length < 5) {
      toast.error('Comment should be greater than 4.', toastOptions);
      return false;
    }
    return true;
  };

  const handleComment = async () => {
    if (handleValidation()) {
      try {
        const response = await axios.post(`http://localhost:5000/api/postvideofile/${id}/comment`, {
          text: newComment,
        });
        setPost(response.data);
        setComments(response.data.comments);
        setNewComment('');
      } catch (error) {
        console.error('Error commenting on post:', error);
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this post!',
        text: post.description,
        url: window.location.href
      }).then(() => {
        // toast.info('Post shared successfully!', toastOptions);
        // You can also make an API call here to log the share event if needed
      }).catch((error) => {
        console.error('Error sharing:', error);
        toast.error('Failed to share post.', toastOptions);
      });
    } else {
      toast.error('Sharing is not supported in your browser.', toastOptions);
    }
  };

  if (!post) return <Loading>Loading...</Loading>;

  return (
    <>
      <ProfileLogo />
      <GlobalStyle />
      <PostContainer>
        <VideoContainer>
          <video src={`http://localhost:5000/${post.videoUrl}`} controls />
        </VideoContainer>
        <Content>{post.description}</Content>
      </PostContainer>
        <Actions>
          <Button onClick={handleLike}>
            <FaHeart /> {post.likes}
          </Button>
          <ShareButton onClick={handleShare}>
            <FaShareSquare /> Share
          </ShareButton>
        </Actions>
      <CommentsContainer>
        <h2>Comments</h2>
        <CommentInput>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button onClick={handleComment}>Submit</button>
        </CommentInput>
        {comments.map((comment, index) => (
          <Comment key={index}>{comment.text}</Comment>
        ))}
      </CommentsContainer>
      <ToastContainer />
    </>
  );
};

const VideoContainer = styled.div`
  flex: 0 0 70%; /* Takes up 70% of the height */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 7px;

  video {
    max-width: 600px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const PostContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Ensure relative positioning for absolute child */
`;

const Loading = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 50px;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
`;

const Actions = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #ff6b6b;

  svg {
    margin-right: 5px;
  }

  &:hover {
    color: #ff4d4d;
  }
`;

const ShareButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #3498db;

  svg {
    margin-right: 5px;
  }

  &:hover {
    color: #2980b9;
  }
`;

const CommentsContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #333;
  }
`;

const Comment = styled.div`
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #555;
`;

const CommentInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  input {
    color:#000000;
    font-weight:bold;
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 10px 20px;
    background: #ff6b6b;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background: #ff4d4d;
    }
  }
`;

export default PostPage;
