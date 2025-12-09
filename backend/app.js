const express = require('express');
const app = express()
let todoRoutes = require('./routes/todoRoutes')
// const ip = require('ip');
const dotenv = require('dotenv');

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("trust proxy",true)

app.use("/todos", todoRoutes)

app.get("/ip", async (req,res) => {
    // Source - https://stackoverflow.com/a/37697070
// Posted by ashishyadaveee11
// Retrieved 2025-12-09, License - CC BY-SA 3.0

    const ipv4 = req.ip.split(":").pop();
  console.log("ipv4: ", ipv4);
  res
    .status(200)
    .send(
      `Hello, your ipv4 address is ${ipv4}`
    );

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})