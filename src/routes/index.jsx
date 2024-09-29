import React from "react";
import { Route, Routes } from "react-router-dom";
import BlogForm from "../pages/blogs";
import PostForm from "../pages/posts";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<PostForm />} />
      <Route path="/blogs" exact element={<BlogForm />} />
    </Routes>
  );
};

export default AppRoutes;
