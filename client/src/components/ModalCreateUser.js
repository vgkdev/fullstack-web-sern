import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { createNewUser } from "../services/userService";

import "./ModalCreateUser.scss";

const ModalCreateUser = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        props.setStateLogin();
      }
      console.log(">>>check user: ", user.data);
    } catch (err) {
      console.log(err);
    }
  };

  let data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
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
          </div>
          <div className="err-message">{errMessage}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="footer-container">
          <Button onClick={() => handleCreateNewUser(data)} variant="success">
            Register
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCreateUser;
