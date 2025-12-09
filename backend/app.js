const express = require('express');
const app = express()
let todoRoutes = require('./routes/todoRoutes')
const ip = require('ip');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/todos", todoRoutes)

app.get("/", async (req,res) => {
    var ipaddress = req.ip
    console.log(ipaddress);
    
    res.send(ipaddress)
})

app.listen(3000,()=>{
    console.log(`Server running on port 3000`);
})