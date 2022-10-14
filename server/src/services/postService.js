import db from "../models/index";

let createNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let post = await db.Post.create({
        userID: data.userID,
        content: data.content,
      });

      if (!post) {
        resolve({
          errCode: 1,
          message: "Create post is failed!",
        });
      } else {
        resolve({
          errCode: 0,
          message: "create new post is successful",
          post,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllPosts = (userID) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userID) {
        resolve({
          errCode: 2,
          message: "Missing parameter!",
        });
      }

      let posts = [];
      if (userID === "ALL") {
        posts = await db.Post.findAll();
      } else {
        posts = await db.Post.findAll({
          where: { userID: userID },
        });
      }

      if (posts.length !== 0) {
        resolve({
          errCode: 0,
          message: "successful",
          posts,
        });
      } else {
        resolve({
          errCode: 1,
          message: "failed",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let EditPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Missing parameter!",
        });
      }

      let post = await db.Post.findOne({
        where: { id: data.id },
      });

      if (post) {
        post.content = data.content;

        post = await post.save();
        resolve({
          errCode: 0,
          message: "successful",
          post,
        });
      } else {
        resolve({
          errCode: 1,
          message: "failed!",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let deletePost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 2,
          message: "Missing parameter!",
        });
      }

      let post = await db.Post.findOne({
        where: { id: id },
      });

      if (!post) {
        resolve({
          errCode: 1,
          message: "The post isn't exist",
        });
      }

      await db.Post.destroy({
        where: { id: id },
      });
      resolve({
        errCode: 0,
        message: "successful",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createNewPost,
  getAllPosts,
  EditPost,
  deletePost,
};
