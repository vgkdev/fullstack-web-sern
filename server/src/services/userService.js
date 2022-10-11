import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
          attributes: ["id", "firstName", "lastName", "email", "password"],
        });
        // console.log(">>check user: ", user);
        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            userData.errCode = 0;
            userData.message = "ok";
            //  delete user.password; //xóa password khỏi object user
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.message = "wrong password!";
          }
        } else {
          userData.errCode = 2;
          userData.message = "user not found!";
        }
      } else {
        userData.errCode = 1;
        userData.message = "Your's email isn't exist!";
      }
      resolve(userData);
    } catch (err) {
      reject(err);
    }
  });
};

let checkUserEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: email },
      });

      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let isExist = await checkUserEmail(data.email);
      if (isExist === true) {
        resolve({
          errCode: 1,
          message: "This email is already in use!",
        });
      } else {
        let hashPassword = await hashUserPassword(data.password);

        let user = await db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        resolve({
          errCode: 0,
          message: "create new user is successful",
          user,
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let getAllUsers = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = [];
      if (id === "ALL") {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
      } else if (id) {
        users = await db.User.findOne({
          where: { id: id },
          attributes: { exclude: ["password"] },
        });
      }
      // console.log(">>>check user: ", users);
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
};

let updataUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          message: "Missing required parameters",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        // raw: false,
      });

      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;

        await user.save();
        resolve({
          errCode: 0,
          message: "User updated successful",
          user,
        });
      } else {
        resolve({
          errCode: 1,
          message: "User's nod found",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

let deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });

      if (!user) {
        resolve({
          errCode: 2,
          message: "The user isn't exist",
        });
      }

      await db.User.destroy({
        where: { id: id },
      });

      resolve({
        errCode: 0,
        message: "The user has been deleted",
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  handleUserLogin,
  checkUserEmail,
  createNewUser,
  getAllUsers,
  updataUserData,
  deleteUser,
};
