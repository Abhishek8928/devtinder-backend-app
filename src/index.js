

const express = require('express');
const app = express();
const port = 7777;


app.use("/test",(req,res)=>{
    res.send('hello world test');
})
app.use("/demo",(req,res)=>{
    res.send('hello world demO');
})




const BASE_URL = `http:localhost:${port}`

app.listen(port,()=>{
    console.log(`🚀 Server is Up & Running on ${BASE_URL}`)
})