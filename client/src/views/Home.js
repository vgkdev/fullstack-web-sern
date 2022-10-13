import React, { useState } from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import ModalAddNewPost from "../components/ModalAddNewPost";

import { connect } from "react-redux";

import "./Home.scss";

const Home = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="home-container">
      <div className="add-new-post">
        <BiMessageRoundedAdd
          className="icon-add-new-post"
          onClick={() => setModalShow(true)}
        />
        <div className="text" onClick={() => setModalShow(true)}>
          Add new post ...
        </div>
      </div>

      <ModalAddNewPost show={modalShow} onHide={() => setModalShow(false)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
