const express = require('express');
const app = express()
let todoRoutes = require('./routes/todoRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/todos", todoRoutes)

app.listen(3000,()=>{
    console.log(`Server running on port 3000`);
})