import axios from "axios";

const getAllPosts = (userID) => {
  return axios.get(
    `http://localhost:8080/api/v1/get-all-posts?userID=${userID}`
  );
};

export { getAllPosts };
