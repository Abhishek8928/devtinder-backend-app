const express = require("express");
const UserModel = require("./models/User");
const app = express();
const port = 7777;
const connectDB = require("./config/connection");

app.post("/api/signup", async (req, res) => {
  const newUser = {
    firstName: "Neeru",
    lastName: "Bajwa",
    emailId: "Neerubajwa@gmail.com",
    hashPassword: "Nerru123",
    age: 24,
    gender: "female",
  };

  try {
    const user = new UserModel({ ...newUser });
    await user.save();
    res.send(`welcome ${user?.firstName}`)
  } catch (err) {
    res.status(400).send("Error mounting the resources: Invalid input data.");
  }

  // res.send("user creted successfully");
});

connectDB()
  .then(() => {
    console.log("connection has been established ...");
    app.listen(port, () => {
      console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
    });
  })
  .catch((err) => console.log("connection has been failed ..."));

const BASE_URL = `http:localhost:${port}`;
