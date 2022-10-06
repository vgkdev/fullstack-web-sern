import userService from "../services/userService";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.message,
    user: userData.user ? userData.user : {},
  });
};

let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //ALL, id params in url

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters",
      users: [],
    });
  } else {
    let users = await userService.getAllUsers(id);
    if (!users) {
      return res.status(500).json({
        errCode: 1,
        message: "Not found user!",
      });
    }

    return res.status(200).json({
      errCode: 0,
      message: "ok",
      users,
    });
  }
};

let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updataUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  let id = req.body.id;
  // console.log(">>>check id: ", id);

  if (!id) {
    return res.status(200).json({
      errCode: 1,
      message: "Missing required parameters!",
    });
  }

  let message = await userService.deleteUser(id);
  return res.status(200).json(message);
};

module.exports = {
  handleLogin,
  handleCreateNewUser,
  handleGetAllUsers,
  handleEditUser,
  handleDeleteUser,
};
