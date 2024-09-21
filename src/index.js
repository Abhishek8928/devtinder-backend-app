const express = require("express");
const app = express();
const port = 7777;


app.get('/fly/:userId',(req,res)=>{
    console.log(req.params)
    res.send('anything after b is allowed')
})


const BASE_URL = `http:localhost:${port}`;

app.listen(port, () => {
  console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
});
