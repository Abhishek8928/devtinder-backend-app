const express = require("express");
const app = express();
const port = 7777;


app.get("/user",(req,res)=>{
    res.send({
        firstName:"abhishek",
        lastName:"sharma"
    })
})

app.post("/user",(req,res)=>{
    res.send("new user added to db");
})


app.put("/user",(req,res)=>{
    res.send("completed data has been changed");
})

app.patch("/user",(req,res)=>{
res.send({
    message:"partially updated data"
})
})
app.delete("/user",(req,res)=>{
    res.send("deleted user from the database")
})

app.use("/",(req,res)=>{
    res.send("working for all https method + same path but also followed by differnet path also working")
})
const BASE_URL = `http:localhost:${port}`;

app.listen(port, () => {
  console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
});
