const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

const { validateLogInForm, validateSignUpForm } = require("../utils/validate");


const NotificationModel = require("../models/Notification");

router.post("/signup", async (req, res) => {
  try {
    // Validate the request body before proceeding
    validateSignUpForm(req);

    // Extract the password from the request body
    const {userPassword ,userEmail} = req.body;

    // Define the salt round count for password hashing
    const saltRounds = 10;

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(userPassword, salt);

    // Prepare the user data for saving
    const userData = {
      ...req.body,
      emailId:userEmail,
      hashPassword: hashedPassword,
    };

    // Create a new user document
    const newUser = new UserModel(userData);

    const NotificationInstances = NotificationModel({
      userId: newUser._id,
    });

    await NotificationInstances.save();
    await newUser.save();

    const token = await newUser.getJWT();


    res.cookie("token", token, {
      httpOnly: true,                    // Prevents access via JavaScript
      secure: true,                      // Ensures cookies are only sent over HTTPS in production
      sameSite: 'None',
      signed: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });


    res.status(200).json({
      message:"New User Created Successfully",
      data:newUser
    });

  } catch (error) {
    // Handle any errors that occur during the signup process
    res.status(400).send(`Error during signup: ${error.message}`);
  }
});

router.post("/login", async (req, res) => {
  try {
    
    validateLogInForm(req);

    const { userEmail, userPassword } = req.body;
    const existingUser = await UserModel.findOne({ emailId: userEmail });

    if (!existingUser) {
      throw new Error("Invalid Credential");
    }

    const isPasswordValid = await existingUser.comparePassword(userPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid Credential");
    }
    

   

    const token = await existingUser.getJWT();


    res.cookie("token", token, {
      httpOnly: true,                    // Prevents access via JavaScript
    secure: true,                      // Ensures cookies are only sent over HTTPS in production
    sameSite: 'None',
      signed: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    
    res.status(200).json({
      message:"User Logged In Successfully",
      data:existingUser
    });
  } catch (error) {
    // Handle any errors that occur during the signup process
    res.status(400).send(`Error during login: ${error.message}`);
  }
});

router.post("/logout", (req, res) => {

  res.cookie("token", null, { expires: new Date() }).status(200).json({
    status: 1,
    message: "user loggedout successfully",
  });
});

module.exports = router;
