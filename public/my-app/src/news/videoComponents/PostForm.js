import React, { useState } from "react";
import styled from "styled-components";
import { FaVideo } from "react-icons/fa";

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState("");
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!video) {
      return;
    }

    const formData = new FormData();
    formData.append('description', content);
    formData.append('video', video);

    addPost(formData);
    setContent("");
    setVideo(null);
    setVideoPreview("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <VideoUpload>
        <label htmlFor="file-input">
          <FaVideo />
          <span>Upload Video</span>
        </label>
        <input id="file-input" type="file" onChange={handleImageChange} />
        {videoPreview && (
          <SelectedVideo>
            <video src={videoPreview} controls />
          </SelectedVideo>
        )}
      </VideoUpload>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add description"
      />
      <div className="actions">
        <button type="submit">Post</button>
      </div>
    </Form>
  );
};

const Form = styled.form`
  background: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 480px;
  margin: 10px auto;
  padding: 15px;

  input {
    width: 100%;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
    resize: none;
    font-size: 1.2rem;
    border: 1px solid #34495e;
    border-radius: 4px;
    background: #ecf0f1;
    color: #2c3e50;
  }

  .actions {
    display: flex;
    justify-content: flex-end;

    button {
      border-radius: 4px;
      background: #3498db;
      color: #fff;
      border: none;
      padding: 10px 15px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      outline: none;
      font-size: 1rem;

      &:hover {
        background: #2980b9;
      }
    }
  }
`;

const VideoUpload = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  flex-direction: column;

  label {
    cursor: pointer;
    font-size: 1.5rem;
    color: #ecf0f1;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    span {
      margin-left: 8px;
      font-size: 1rem;
      color: #ecf0f1;
    }
  }

  input {
    display: none;
  }
`;

const SelectedVideo = styled.div`
  margin-top: 10px;
  
  video {
    max-width: 100%;
    max-height: 200px; /* Set a maximum height for the video preview */
    border-radius: 8px;
  }
`;

export default PostForm;
