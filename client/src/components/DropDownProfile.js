import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { IoMdLogOut } from "react-icons/io";
import { NavLink } from "react-router-dom";

import ModalCreateUser from "../components/ModalCreateUser";

import { connect } from "react-redux";

import "./DropDownProfile.scss";

const DropDownProfile = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const handleLogOutUser = () => {
    props.saveUserRedux(null);
  };

  return (
    <Dropdown className="dropdown-container">
      <Dropdown.Toggle
        id="dropdown-button-dark-example1"
        style={{ backgroundColor: "#ffffff", border: "none" }}
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
        <div className="dropdown-item">
          <NavLink to={"/profile"}>
            <FaUserAlt className="icon-profile" />
            <span className="profile">
              {props.userDataRedux.firstName +
                " " +
                props.userDataRedux.lastName}
            </span>
          </NavLink>
        </div>
        <Dropdown.Divider />

        <div className="dropdown-item" onClick={() => setModalShow(true)}>
          <NavLink>
            <AiTwotoneSetting className="icon-setting" />
            <span>Update Profile</span>
          </NavLink>
        </div>

        <div className="dropdown-item" onClick={handleLogOutUser}>
          <NavLink>
            <IoMdLogOut className="icon-setting" />
            <span>Log Out</span>
          </NavLink>
        </div>
      </Dropdown.Menu>
      <ModalCreateUser
        type={"Update"}
        dataUser={props.userDataRedux}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Dropdown>
  );
};

const mapStateToProps = (state) => {
  return {
    userDataRedux: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserRedux: (userData) =>
      dispatch({ type: "SAVE_USER", payload: userData }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownProfile);
