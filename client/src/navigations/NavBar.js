import React from "react";
import { NavLink } from "react-router-dom";

import { IoLogoOctocat } from "react-icons/io";
import DropDownProfile from "../components/DropDownProfile";

import { connect } from "react-redux";

import "./NavBar.scss";

const NavBar = (props) => {
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
          <div className="divider" />
        </NavLink>

        <NavLink to={"/posts"}>
          Posts
          <div className="divider" />
        </NavLink>

        <NavLink to={"/profile"}>
          Profile
          <div className="divider" />
        </NavLink>
      </div>

      <div className="right-bar">
        {/* <Dropdown className="dropdown-container">
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            style={{ backgroundColor: "#d9dbe1", border: "none" }}
          >
            <FaUserAlt
              style={{
                width: "25px",
                height: "25px",
                color: " rgb(53, 53, 209)",
              }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="dropdown-menu-container">
            <div className="dropdown-item-profile">
              <NavLink to={"/profile"}>
                <FaUserAlt className="icon" />
                <span>
                  {props.dataRedux.firstName + " " + props.dataRedux.lastName}
                </span>
              </NavLink>
            </div>

            <div></div>
            <Dropdown.Divider />
          </Dropdown.Menu>
        </Dropdown> */}
        <DropDownProfile />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataRedux: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserRedux: (userData) =>
      dispatch({ type: "SAVE_USER", payload: userData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
