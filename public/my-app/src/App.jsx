import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Chat from "./components/Chat";
import Profile from "./components/Profile";
import Home from "./components/Home";
import StartScreen from "./components/StartScreen";
import { ThemeProvider } from "styled-components";
import theme from "./news/styles/theme";

import TextHome from "./news/textComponents/Home";
import ImageHome from "./news/imageComponents/Home";
import VideoHome from "./news/videoComponents/Home";
import News from "./news/HomeNews";

import PostPage from "./news/textComponents/PostPage";
import PostImagePage from "./news/imageComponents/PostPage";
import PostVideoPage from "./news/videoComponents/PostPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Home />} />
        <Route path="/startscreen" element={<StartScreen />} />
        
        <Route path="/News" element={<News />} />

        <Route path="/textNews" element={<TextHome />} />
        <Route path="/imageNews" element={<ImageHome />} />
        <Route path="/videoNews" element={<VideoHome />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/postfile/:id" element={<PostImagePage />} />
        <Route path="/postvideofile/:id" element={<PostVideoPage />} />

        <Route path="/upload-image">
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}