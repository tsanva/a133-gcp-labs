require('@google-cloud/debug-agent').start()
require('dotenv').config()

const https = require("https");
const fs = require("fs");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const recordRouter = require('./routes/record')

app.use(bodyParser.urlencoded({extended: true}))
app.use(recordRouter)

app.get("/", (req, res) => {
    console.log("Response success")
    res.send("Response Success!")
})

// const PORT = process.env.PORT || 8000
// app.listen(PORT, () => {
//     console.log("Server is up and listening on " + PORT)
// })

https
  .createServer(
    {
      key: fs.readFileSync("./sslcert/key.key"),
      cert: fs.readFileSync("./sslcert/cert.pem"),
    },
    app
  )
  .listen(443, () => {
    console.log("running on port 443");
  });