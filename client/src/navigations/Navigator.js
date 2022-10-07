import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Posts from "../views/Posts";
import NavBar from "./NavBar";

const Navigator = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="posts/*" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
