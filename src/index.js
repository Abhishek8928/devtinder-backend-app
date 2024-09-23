const express = require("express");
const app = express();
const port = 7777;

const isAdmin = require("./Middleware/isAdmin")
const isUser = require("./Middleware/isUser")
app.use("/admin",isAdmin);


app.get("/admin/allUser", (req, res) => {
  res.send("abled to access any resourcees becuase you are the admin");
});
app.get("/admin/delteUser", (req, res, next) => {});


app.get("/user/getprofile", isUser,  (req,res)=>{
res.send("abled to access")
})

app.get("/user/login",  (req,res)=>{
  res.send("witout middleware")
  })

const BASE_URL = `http:localhost:${port}`;

app.listen(port, () => {
  console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
});
