const express = require("express");
const app = express();
const port = 7777;


app.get('/fly',[(req,res,next)=>{
  next()
    console.log('router handler first')
    // res.send('responses 1')
},(req,res,next)=>{
  console.log('router handler second')
  // res.send('responses 2')
  next()
}],(req,res,next)=>{
  console.log('router handler third')
  next()
},(req,res,next)=>{
  console.log('router handler fourth')
  res.send('responses 4')
})


const BASE_URL = `http:localhost:${port}`;

app.listen(port, () => {
  console.log(`🚀 Server is Up & Running on ${BASE_URL}`);
});
