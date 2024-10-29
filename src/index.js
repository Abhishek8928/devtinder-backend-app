const express = require("express");
const UserModel = require("./models/User");
const app = express();
const port = 7777;
const connectDB = require("./config/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { validateSignUpForm, validateLogInForm } = require("./utils/validate");
const validateToken = require("./middleware/auth");

// middleware
app.use(express.json());
app.use(cookieParser("devTinder"));

app.post("/api/v1/signup", async (req, res) => {
  try {
    // Validate the request body before proceeding
    validateSignUpForm(req);

    // Extract the password from the request body
    const { hashPassword } = req.body;

    // Define the salt round count for password hashing
    const saltRounds = 10;

    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(hashPassword, salt);

    // Prepare the user data for saving
    const userData = {
      ...req.body,
      hashPassword: hashedPassword,
    };

    // Create a new user document
    const newUser = new UserModel(userData);

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(200).send("User created successfully");
  } catch (error) {
    // Handle any errors that occur during the signup process
    res.status(400).send(`Error during signup: ${error.message}`);
  }
});

app.post("/api/v1/login", async (req, res) => {
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
      signed: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    res.status(200).send("user logged in successfully");
  } catch (error) {
    // Handle any errors that occur during the signup process
    res.status(400).send(`Error during login: ${error.message}`);
  }
});

app.get("/api/v1/profile", validateToken, async (req, res) => {
  try {
    const { token } = req.signedCookies;

    if (!token) {
      throw new Error("Token is required for authentication");
    }

    const decodedToken = jwt.verify(token, "devTinder");
    const { _id } = decodedToken;

    const user = await UserModel.findById(_id);
    console.log(user);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(`Token verification failed: ${error.message}`);
  }
});

app.post("/api/v1/sendconnectionrequest", validateToken, (req, res, next) => {
  const { user } = req;

  res.send(user.firstName + " is sending connection request to other");
});

app.use('*',(req,res)=>{
  res.send('failed to find any specific routes')
})


const BASE_URL = `http:localhost:${port}`;

connectDB()
  .then(() => {
    console.log("connection has been established ...");
    app.listen(port, () => {
      console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
    });
  })
  .catch((err) => console.log("connection has been failed ..."));

