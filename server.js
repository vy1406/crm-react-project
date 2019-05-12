const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const api = require('./src/server/routes/api')
const app = express()

mongoose.connect("mongodb://localhost/crm")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

app.use('/', api)

const port = 8080
app.listen(port, function(){
    console.log("up and running")
})
