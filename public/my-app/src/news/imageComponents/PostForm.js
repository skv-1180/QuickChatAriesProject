import React, { useState } from "react";
import styled from "styled-components";
import { FaImage } from "react-icons/fa";

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }

    const formData = new FormData();
    formData.append('description', content);
    formData.append('image', image);

    addPost(formData);
    setContent("");
    setImage(null);
    setImagePreview("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ImageUpload>
        <label htmlFor="file-input">
          <FaImage />
          <span>Upload Image</span>
        </label>
        <input id="file-input" type="file" onChange={handleImageChange} />
        {imagePreview && (
          <SelectedImage>
            <img src={imagePreview} alt="Selected" />
          </SelectedImage>
        )}
      </ImageUpload>
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

const ImageUpload = styled.div`
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

const SelectedImage = styled.div`
  margin-top: 10px;
  img {
    max-width: 100%;
    max-height: 200px; /* Set a maximum height for the preview image */
    border-radius: 8px;
  }
`;

export default PostForm;
