import db from "../models/index";
//all model in database

let getHomePage = async (req, res) => {
  try {
    let userData = await db.User.findAll(); //model name
    let userPost = await db.Post.findAll();
    //console.log(">>>check data: ", userData);

    return res.render("homePage.ejs", {
      userData: JSON.stringify(userData),
      userPost: JSON.stringify(userPost),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHomePage };
