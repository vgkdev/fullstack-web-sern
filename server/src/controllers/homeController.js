import db from "../models/index";
//all model in database

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    console.log(">>>check data: ", data);

    return res.render("homePage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getHomePage };
