//SERVER SETUP
//THIS IS A COPY OF CODE FROM BACKEND
require("dotenv").config()
const port = process.env.PORT || 8000
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const router = require('./routes/routes')
app.use(express.json())

//ACCESS HEADERS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "Origin-Url")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header("Access-Control-Allow-Methods", "*")
  next()
});

//USE OF API ROUTES TO MAKE REQUESTS
app.use('/api/v1/', router)

const start = async () => {
    try {
        //CONNECTION TO DATA BASE
        await connectDB(process.env.CLUSTER_URI)
        app.listen(port, console.log(`Listening port ${port}`))
    } catch (error) {
        console.log(error);
    }
}
start()