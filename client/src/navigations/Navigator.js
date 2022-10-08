import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Login from "../views/Login";
import Posts from "../views/Posts";
import NavBar from "./NavBar";

const Navigator = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="posts" element={<Posts />} />

        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
