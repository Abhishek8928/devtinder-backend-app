const express = require("express");
const UserModel = require("./models/User");
const app = express();
const port = 7777;
const connectDB = require("./config/connection");

// middleware
app.use(express.json());

app.get("/api/user", async function (req, res) {
  const { emailId } = req.body;

  if (emailId) {
    const user = await UserModel.findOne({ emailId });

    if (!user) {
      return res.status(404).send("user with the email does not exist");
    }

    return res.send(user);
  }

  res.status(400).send("no email id is provided");
});

app.get("/api/users", async function (req, res) {
  try {
    const user = await UserModel.find({});

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send("server internal error: " + err.message);
  }
});

// to get speific user by id

app.get("/api/user/:id", async function (req, res) {
  try {
    if (req.params.id) {
      const user = await UserModel.findById(req.params.id);

      return res.status(200).json({
        status: true,
        user: user,
      });
    }

    res.status(400).send("id is not provieded to us");
  } catch (err) {
    res.status(500).send("server internal error: " + err.message);
  }
});

app.post("/api/signup", async (req, res) => {
  try {
    const user = new UserModel({ ...req.body });
    await user.save();
    res.send(`welcome ${user?.firstName}`);
  } catch (err) {
    res
      .status(400)
      .send("Error mounting the resources: Invalid input data." + err.message);
  }
});

app.delete("/api/users", async function (req, res) {
  const { userId } = req.body;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId, {
      lean: true,
    });

    console.log(deletedUser);

    res.status(200).send("user deleted successfully");
  } catch (err) {
    res.status(500).send("server internal error: " + err.message);
  }
});

app.patch("/api/users", async function (req, res) {
  const { userId } = req.body;

  const ALLOWED_FORMAT = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "skills",
  ];

  const isUpdatedValid = Object.keys(req.body).every((k) =>
    ALLOWED_FORMAT.includes(k)
  );

  if (!isUpdatedValid) {
    return res
      .status(400)
      .send("can only updated the field " + ALLOWED_FORMAT.join(","));
  }

  if (req.body?.skills && req.body.skills.length > 10) {
    return res
      .status(400)
      .send("skills array should not have more than 10 items");
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { ...req.body },
      { new: true, runValidators: true }
    );

    console.log(updatedUser);

    res.status(200).send("user updated successfully");
  } catch (err) {
    res.status(500).send("server internal error: " + err.message);
  }
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
