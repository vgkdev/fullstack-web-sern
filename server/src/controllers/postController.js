import postService from "../services/postService";

let handleCreateNewPost = async (req, res) => {
  let message = await postService.createNewPost(req.body);
  return res.status(200).json(message);
};

let handleGetAllPosts = async (req, res) => {
  let message = await postService.getAllPosts(req.query.userID);
  return res.status(200).json(message);
};

let handleEditPost = async (req, res) => {
  let message = await postService.EditPost(req.body);
  return res.status(200).json(message);
};

let handleDeletePost = async (req, res) => {
  let message = await postService.deletePost(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  handleCreateNewPost,
  handleGetAllPosts,
  handleEditPost,
  handleDeletePost,
};
