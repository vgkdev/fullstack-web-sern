import React from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

import "./ModalAddNewPost.scss";
import Button from "react-bootstrap/esm/Button";

// import "./ModalAddNewPost.scss";

const ModalAddNewPost = (props) => {
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
        <div className="modal-add-new-post-container">
          <div className="user">
            <FaUserAlt className="icon" />
            <span className="name">
              {props.dataRedux.firstName + " " + props.dataRedux.lastName}
            </span>
          </div>

          <textarea placeholder="Write your post ..." />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-container">
          <Button className="btn">Post</Button>
        </div>
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
