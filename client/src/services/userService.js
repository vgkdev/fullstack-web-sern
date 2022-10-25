import axios from "axios";

const handleLoginUser = (userEmail, userPassword) => {
  return axios.post("http://localhost:8080/api/v1/login", {
    email: userEmail,
    password: userPassword,
  });
};

const createNewUser = (data) => {
  // console.log("check data: ", data);
  return axios.post("http://localhost:8080/api/v1/create-new-user", data);
};

const updateUser = (data) => {
  return axios.put("http://localhost:8080/api/v1/edit-user", data);
};

const getUser = (id) => {
  return axios.get(`http://localhost:8080/api/v1/get-all-users?id=${id}`);
};

export { handleLoginUser, createNewUser, updateUser, getUser };
