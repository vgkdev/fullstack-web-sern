import axios from "axios";

const handleLoginUser = (userEmail, userPassword) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    email: userEmail,
    password: userPassword,
  });
};

const createNewUser = (data) => {
  console.log("check data: ", data);
  return axios.post("http://localhost:8080/api/v1/create-new-user", data);
};

export { handleLoginUser, createNewUser };