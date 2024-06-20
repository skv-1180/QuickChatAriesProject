import React, { useState } from "react";
import styled from "styled-components";
import { FaImage, FaVideo, FaLink } from "react-icons/fa";

const PostForm = ({ addPost }) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      addPost({ content, type: "text" });
      setContent("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <div className="actions">
        <button type="button"></button>
        <button type="submit">Post</button>
      </div>
    </Form>
  );
};

const Form = styled.form`
background: white;
border-radius: 8px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
width: 480px;
margin: 10px auto 10px auto;
padding: 15px;
textarea {
outline
;
width: 100%;
border: none;
padding: ${({ theme }) => theme.spacing(2)};
margin-bottom: ${({ theme }) => theme.spacing(2)};
resize: none;
font-size: 1.2rem;
}

.actions {
display: flex;
justify-content: space-between;
align-items: center;

    button {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }

    button[type="submit"] {
      border-radius: 4px;
      background: #649d99;
      color: #fff;
      border: none;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      outline: none;
    }
  }

  label {
    cursor: pointer;
  }
`;

const SelectedImage = styled.div`
  margin-top: 10px;
  img {
    max-width: 100%;
    border-radius: 8px;
  }
`;

export default PostForm;
