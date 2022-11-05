import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPost } from "../services/postService";
import { FaUserAlt } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import ModalCreateUser from "../components/ModalCreateUser";
import Spinner from "react-bootstrap/Spinner";
import { getUser } from "../services/userService";

import DisplayPost from "../components/DisplayPost";

import "./Profile.scss";

const Profile = (props) => {
  const [allPosts, setAllPosts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [infoUser, setInfoUser] = useState("");

  useEffect(() => {
    setIsLoading(false);
    const fetchData = async (id) => {
      try {
        const posts = await getPost(id);
        setIsLoading(true);

        if (!posts) {
          console.log("");
        } else {
          setAllPosts(posts.data.posts.reverse());
        }

        // console.log(">>>check posts data: ", posts.data.posts);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    setTimeout(() => {
      fetchData(props.userID);
    }, 1500);
  }, [props.userDataRedux.id, props.userID]);

  useEffect(() => {
    const fetchData = async (id) => {
      const infoUser = await getUser(id);
      setInfoUser(
        infoUser.data.users.firstName + " " + infoUser.data.users.lastName
      );
    };

    fetchData(props.userID);
  }, [props.userID]);

  //console.log("check parameter: ", props.userID, " : ", props.userDataRedux.id);

  return (
    <div className="profile-container">
      <div className="background-profile">
        <div className="user-infomation">
          <FaUserAlt className="icon" />
          <p className="name">{infoUser}</p>
        </div>

        {props.userID == props.userDataRedux.id && (
          <div className="setting-user">
            <div
              className="setting-container"
              onClick={() => setModalShow(true)}
            >
              <AiTwotoneSetting className="icon" />
              <span>Update Profile</span>
            </div>
          </div>
        )}
      </div>

      <div>
        {allPosts && isLoading ? (
          allPosts.map((item) => {
            return <DisplayPost key={item.id} dataPosts={item} />;
          })
        ) : (
          <div className="loading">
            <Spinner animation="grow" variant="primary" />
          </div>
        )}
        {/* {allPosts &&
          allPosts.map((item) => {
            return <DisplayPost key={item.id} dataPosts={item} />;
          })} */}
      </div>

      <ModalCreateUser
        type={"Update"}
        dataUser={props.userDataRedux}
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
