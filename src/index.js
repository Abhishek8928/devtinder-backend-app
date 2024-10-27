const express = require("express");
const UserModel = require("./models/User");
const app = express();
const port = 7777;
const connectDB = require("./config/connection");
const { validateSignUpForm, validateLogInForm } = require("./utils/validate");
const bcrypt = require("bcrypt");
// middleware
app.use(express.json());

app.post("/api/signup", async (req, res) => {
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


app.post("/api/login",async (req,res)=>{
   try {
    validateLogInForm(req)

    const {emailId,password} = req.body;
    const existingUser = await UserModel.findOne({emailId});

    
    if(!existingUser){
        throw new Error('Invalid Credential');
    }


    const result = await bcrypt.compare(password, existingUser?.hashPassword);
    if(!result){
      throw new Error('Invalid Credential')
    }

    res.status(200).send("user logged in successfully")
   }catch (error) {
    // Handle any errors that occur during the signup process
    res.status(400).send(`Error during login: ${error.message}`);
  }
})




connectDB()
  .then(() => {
    console.log("connection has been established ...");
    app.listen(port, () => {
      console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
    });
  })
  .catch((err) => console.log("connection has been failed ..."));

const BASE_URL = `http:localhost:${port}`;
