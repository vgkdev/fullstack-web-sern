import axios from "axios";

const getAllPosts = (userID) => {
  return axios.get(
    `http://localhost:8080/api/v1/get-all-posts?userID=${userID}`
  );
};

const addNewPost = (data) => {
  return axios.post("http://localhost:8080/api/v1/create-new-post", data);
};

const getPost = (userID) => {
  return axios.get(
    `http://localhost:8080/api/v1/get-all-posts?userID=${userID}`
  );
};

export { getAllPosts, addNewPost, getPost };
