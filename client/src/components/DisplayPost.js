import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { connect } from "react-redux";

import "./DisplayPost.scss";

const DisplayPost = (props) => {
  return (
    <div className="display-post-container">
      <div className="user-infomation">
        <FaUserAlt className="icon" />
        <span className="name">
          {props.dataRedux.firstName + " " + props.dataRedux.lastName}
        </span>
      </div>

      <div className="content"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPost);
