import React from "react";
import { NavLink } from "react-router-dom";

import { IoLogoOctocat } from "react-icons/io";

import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="nav-bar-container">
      <div className="left-bar">
        <NavLink
          end
          to={"/"}
          className={({ isActive }) =>
            isActive ? "nohover noactive" : "nohover"
          }
        >
          <IoLogoOctocat className="icon" />
        </NavLink>

        <NavLink end to={"/"}>
          Home
        </NavLink>

        <NavLink to={"/posts"}>Posts</NavLink>

        <NavLink to={"/profile"}>Profile</NavLink>
      </div>

      <div className="right-bar">
        <NavLink end to={"/login"}>
          Log in
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
