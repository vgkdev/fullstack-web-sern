import express from "express";
import userController from "../controllers/userController";
import postController from "../controllers/postController";

let router = express.Router();

let initAPIRoutes = (app) => {
  router.post("/login", userController.handleLogin);
  router.post("/create-new-user", userController.handleCreateNewUser);
  router.get("/get-all-users", userController.handleGetAllUsers);
  router.put("/edit-user", userController.handleEditUser);
  router.delete("/delete-user", userController.handleDeleteUser);

  router.post("/create-new-post", postController.handleCreateNewPost);
  router.get("/get-all-posts", postController.handleGetAllPosts);
  router.put("/edit-post", postController.handleEditPost);
  router.delete("/delete-post", postController.handleDeletePost);

  return app.use("/api/v1/", router);
};

module.exports = initAPIRoutes;
