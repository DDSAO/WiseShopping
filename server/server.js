const express = require('express');
const mongoose = require('mongoose')
require('dotenv/config');
const app = express();
const bodyParser = require("body-parser")

//import index model
const Index = require("./model/Index")

app.use(bodyParser.json())




//Import Route
const wishlistRouter = require('./routes/Wishlist')
app.use('/wishlist', wishlistRouter)

app.get('/', (req, res) => {
    res.send('Home page')
})

app.get('/destroy', (req, res) => {
    Index.reset()
    res.send('destroyed')
})

//connect to db
/*
mongoose.connect(process.env.MODEL_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true}, 
    ()=> console.log("connected to db"))
*/

app.listen(4000)