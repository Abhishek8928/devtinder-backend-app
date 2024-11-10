const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

async function validateToken(req, res, next) {
  try {
    const { token } = req?.signedCookies;

    if (!token) {
      return res.status(401).send("token is not valid or not present");
    }

    const { _id } = jwt.verify(token, "devTinder");

    const user = await UserModel.findById(_id);

    if (!user) {
      throw new Error("User Not Found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
}


module.exports = validateToken;