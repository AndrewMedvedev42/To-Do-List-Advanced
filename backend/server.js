require("dotenv").config()
const mongoose = require('mongoose');
const path = require('path')
const port = process.env.PUBLIC_URL || 8000
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const router = require('./routes/routes')

app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000") // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "*")
  next()
});


app.use('/api/v1/', router)

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const start = async () => {
    try {
        await connectDB(process.env.CLUSTER_URI)
        app.listen(port, console.log(`Listening port ${port}`))
    } catch (error) {
        console.log("error");
    }
}
start()