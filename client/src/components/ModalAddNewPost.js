import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

// import "./ModalAddNewPost.scss";

const ModalAddNewPost = (props) => {
  const [errMessage, setErrMessage] = useState("");

  //   const handleOnChangeFirstName = (event) => {
  //     setFirstName(event.target.value);
  //   };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add New Post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <div className="input-user-name"></div>

          <div className="input-email-password"></div>
          <div className="err-message">{errMessage}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-container"></div>
      </Modal.Footer>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddNewPost);

//export default ModalAddNewPost;
