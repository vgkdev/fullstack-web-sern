import React, { useEffect, useState } from "react";
import { BiMessageRoundedAdd } from "react-icons/bi";
import ModalAddNewPost from "../components/ModalAddNewPost";
import { getAllPosts, addNewPost } from "../services/postService";
import { connect } from "react-redux";
import DisplayPost from "../components/DisplayPost";
import Spinner from "react-bootstrap/Spinner";

import "./Home.scss";

const Home = (props) => {
  // const [posts, setPosts] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataPosts = await getAllPosts("ALL");
        setIsLoading(true);

        if (!dataPosts) {
          console.log("not found post");
        } else {
          //setPosts(dataPosts.data.posts);
          const posts = dataPosts.data.posts;
          posts.reverse();
          props.savePostsRedux(dataPosts.data.posts);
          console.log(dataPosts.data.posts);
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1500);
  }, []);

  const handleAddNewPost = async (postContent) => {
    await addNewPost({
      userID: props.userDataRedux.id,
      content: postContent,
    });

    try {
      let dataPosts = await getAllPosts("ALL");
      setIsLoading(true);

      if (!dataPosts) {
        console.log("not found post");
      } else {
        //setPosts(dataPosts.data.posts);
        const posts = dataPosts.data.posts;
        posts.reverse();
        props.savePostsRedux(dataPosts.data.posts);
        console.log(dataPosts.data.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

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

      {props.postsDataRedux &&
        isLoading &&
        props.postsDataRedux.map((item) => {
          return <DisplayPost key={item.id} dataPosts={item} />;
        })}

      {(!props.postsDataRedux || !isLoading) && (
        <div className="loading">
          <Spinner animation="grow" variant="primary" />
        </div>
      )}

      <ModalAddNewPost
        handleAddNewPostFromHome={handleAddNewPost}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
