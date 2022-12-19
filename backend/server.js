const path = require('path')
const express = require('express')
const mongoose = require('mongoose');
const port = process.env.PORT || 5000
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()

mongoose.set('strictQuery', true);
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/api/admin",require("./routes/adminRouts"))
app.use("/api/organization",require("./routes/organizationRouts"))
app.use("/api/event",require("./routes/eventRouts"))
app.use("/api/volunteer",require("./routes/volunteerRouts"))

app.listen(port,()=>console.log(`Server started on port ${port}`))