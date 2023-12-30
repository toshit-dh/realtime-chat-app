const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoutes')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)

const DB = mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.log(err.message);
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Listening to ${process.env.PORT}`);
})