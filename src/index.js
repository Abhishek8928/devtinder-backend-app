const express = require("express");
const app = express();
const port = 7777;
const connectDB = require("./config/connection");
const cookieParser = require("cookie-parser");

// middleware
app.use(express.json());
app.use(cookieParser("devTinder"));

app.use("/api/v1", require("./Router/auth"));
app.use("/api/v1", require("./Router/profile"));
app.use("/api/v1", require("./Router/request"));
app.use("/api/v1", require("./Router/connection"));
// app.use("/api/v1", require("./Router/feed"));
app.use("/api/v1", require("./Router/additional"));
app.use("/api/v1", require("./Router/users"));

app.use("*", (req, res) => {
  res.send("failed to find any specific routes");
});

const BASE_URL = `http:localhost:${port}`;

connectDB()
  .then(() => {
    console.log("connection has been established ...");
    app.listen(port, () => {
      console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
    });
  })
  .catch((err) => console.log("connection has been failed ..."));
