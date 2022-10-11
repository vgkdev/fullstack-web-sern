import React, { useState } from "react";
import { IoLogoOctocat } from "react-icons/io";

import { handleLoginUser } from "../services/userService";

import Button from "react-bootstrap/Button";
import "./Login.scss";
import ModalCreateUser from "../components/ModalCreateUser";

import { connect } from "react-redux";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleOnChangeEmail = (event) => {
    //console.log(">>>check email: ", event.target.value);
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    //console.log(">>>check password: ", event.target.value);
    setPassword(event.target.value);
  };

  const [modalShow, setModalShow] = React.useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrMessage("Missing parameters!");
      return;
    }
    try {
      let user = await handleLoginUser(email, password);
      console.log(">>>check user: ", user.data);

      if (user && user.data.errCode !== 0) {
        console.log(">>Login is fail: ", user.data.message);
        setErrMessage(user.data.message);
      }

      if (user && user.data.errCode === 0) {
        console.log(">>>successed: ", user.data.user);
        props.saveUserRedux(user.data.user);
        // props.setStateLogin();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-container">
      <div className="left-content">
        <IoLogoOctocat className="icon" />
        Đăng nhập để xem và viết các bài Posts cùng mọi người.
      </div>

      <div className="right-content">
        <input
          type="text"
          onChange={(event) => handleOnChangeEmail(event)}
          placeholder="Email"
          value={email}
        />
        <input
          type="password"
          onChange={(event) => handleOnChangePassword(event)}
          placeholder="Password"
          value={password}
        />

        <div className="err-message">{errMessage}</div>

        <Button onClick={handleLogin} className="btn-login">
          Log in
        </Button>
        <hr />
        <Button
          onClick={() => setModalShow(true)}
          variant="success"
          className="btn-register"
        >
          register
        </Button>
      </div>

      <ModalCreateUser
        type={"Register"}
        dataUser={{ firstName: "", lastName: "", email: "", password: "" }}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
