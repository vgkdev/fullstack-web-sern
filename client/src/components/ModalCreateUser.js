import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";

import { createNewUser, updateUser } from "../services/userService";

import "./ModalCreateUser.scss";

const ModalCreateUser = (props) => {
  const [firstName, setFirstName] = useState(props.dataUser.firstName);
  const [lastName, setLastName] = useState(props.dataUser.lastName);
  const [email, setEmail] = useState(props.dataUser.email);
  const [password, setPassword] = useState(props.dataUser.password);
  const [errMessage, setErrMessage] = useState("");

  const handleOnChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleOnChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleOnChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleCreateNewUser = async (data) => {
    if (!data.firstName || !data.lastName || !data.email || !data.password) {
      setErrMessage("Missing parameters!");
      return;
    }
    try {
      let user = await createNewUser(data);

      if (user && user.data.errCode !== 0) {
        setErrMessage(user.data.message);
      }

      if (user && user.data.errCode === 0) {
        props.saveUserRedux(user.data.user);
        props.onHide();
        //console.log(">>>check create new user: ", user);
      }
      console.log(">>>check user: ", user.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateUser = async (data) => {
    if (!data.firstName || !data.lastName) {
      setErrMessage("Missing parameters!");
      return;
    }

    try {
      let user = await updateUser(data);

      if (user && user.data.errCode !== 0) {
        setErrMessage(user.data.message);
      }

      if (user && user.data.errCode === 0) {
        props.saveUserRedux(user.data.user);
        props.onHide();
      }
      console.log(">>>check update user: ", user.data);
    } catch (err) {
      console.log(err);
    }
  };

  let data = {};

  if (props.type === "Register") {
    data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
  } else {
    data = {
      id: props.userDataRedux.id,
      firstName: firstName,
      lastName: lastName,
    };
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.type}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-container">
          <div className="input-user-name">
            <input
              onChange={(event) => handleOnChangeFirstName(event)}
              placeholder="First Name"
              type="text"
              value={firstName}
            />
            <input
              onChange={(event) => handleOnChangeLastName(event)}
              placeholder="Last Name"
              type="text"
              value={lastName}
            />
          </div>

          <div className="input-email-password">
            {props.type === "Register" && (
              <>
                <input
                  onChange={(event) => handleOnChangeEmail(event)}
                  placeholder="Email"
                  type="text"
                  value={email}
                />
                <input
                  onChange={(event) => handleOnChangePassword(event)}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
              </>
            )}

            {props.type === "Update" && (
              <>
                <input
                  disabled
                  onChange={(event) => handleOnChangeEmail(event)}
                  placeholder="Email"
                  type="text"
                  value={email}
                />
                <input
                  disabled
                  onChange={(event) => handleOnChangePassword(event)}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
              </>
            )}
          </div>
          <div className="err-message">{errMessage}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-container">
          {props.type === "Register" && (
            <Button onClick={() => handleCreateNewUser(data)} variant="success">
              {props.type}
            </Button>
          )}

          {props.type === "Update" && (
            <Button onClick={() => handleUpdateUser(data)} variant="success">
              {props.type}
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateUser);

//export default ModalCreateUser;
