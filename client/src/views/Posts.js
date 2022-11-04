import React, { useEffect } from "react";
import { getAllPosts } from "../services/postService";
import { connect } from "react-redux";
import DisplayPost from "../components/DisplayPost";

import "./Posts.scss";

const Posts = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        let dataPosts = await getAllPosts("ALL");

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

    fetchData();
  }, []);

  return (
    <div className="posts-container">
      {props.postsDataRedux &&
        props.postsDataRedux.map((item) => {
          return <DisplayPost key={item.id} dataPosts={item} />;
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
