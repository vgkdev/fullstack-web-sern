import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { addNewPost } from "../services/postService";

import "./ModalAddNewPost.scss";
import Button from "react-bootstrap/esm/Button";

const ModalAddNewPost = (props) => {
  const [postContent, setPostContent] = useState("");

  const handleAddNewPost = async () => {
    const dataPost = await addNewPost({
      userID: props.userDataRedux.id,
      content: postContent,
    });

    console.log(">>>check new posts: ", dataPost.data.post);

    // const newPost = dataPost.data.post;
    // props.updatePostsRedux(newPost);

    // const allPosts = props.postsDataRedux;
    // props.savePostsRedux(allPosts.unshift(newPost));
    console.log(">>>check posts data: ", props.postsDataRedux);
    props.onHide();
  };

  const handleOnChangePost = (event) => {
    setPostContent(event.target.value);
    // console.log(event.target.value);
  };

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
              {props.userDataRedux.firstName +
                " " +
                props.userDataRedux.lastName}
            </span>
          </div>

          <textarea
            value={postContent}
            placeholder="Write your post ..."
            onChange={(event) => handleOnChangePost(event)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-container">
          <Button className="btn" onClick={handleAddNewPost}>
            Post
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    userDataRedux: state.user,
    postsDataRedux: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserRedux: (userData) =>
      dispatch({ type: "SAVE_USER", payload: userData }),

    savePostsRedux: (postsData) =>
      dispatch({ type: "SAVE_POSTS", payload: postsData }),

    updatePostsRedux: (newPost) =>
      dispatch({ type: "UPDATE_POSTS", payload: newPost }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAddNewPost);

//export default ModalAddNewPost;
