import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { getUser } from "../services/userService";

import "./DisplayPost.scss";

const DisplayPost = (props) => {
  const [infoUser, setInfoUser] = useState("");

  useEffect(() => {
    const fetchData = async (id) => {
      const infoUser = await getUser(id);
      setInfoUser(
        infoUser.data.users.firstName + " " + infoUser.data.users.lastName
      );
    };

    fetchData(props.dataPosts.userID);
  }, [props.dataPosts.userID]);

  return (
    <div className="display-post-container">
      <div className="user-infomation">
        <FaUserAlt className="icon" />
        <span className="name">{infoUser}</span>
      </div>

      <div className="content">{props.dataPosts.content}</div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPost);
