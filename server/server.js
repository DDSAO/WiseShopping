require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyParser = require("body-parser")
const {passport, isAuth} = require("./initPassport")
const flash = require('express-flash');
const session = require('express-session')

//const localStrategy = require('passport-local').Strategy

//connect database
mongoose.connect('mongodb://localhost:27017/WiseShopping', 
    {useNewUrlParser: true, useUnifiedTopology: true, 
        useFindAndModify: false, useCreateIndex: true});

//Import Route
const wishlistRouter = require('./routes/Wishlist')
const userRouter = require('./routes/User')

//configure middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: 'keyboard cat', 
    resave: true, saveUninitialized: true,
    expires: new Date(Date.now() + (30 * 3600))
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/wishlist', wishlistRouter)
app.use('/user', userRouter)

//Define route
app.get('/', (req, res) => {
    console.log(req.user)
    res.send("hi")
})

app.get('/destroy', (req, res) => {
    res.send('destroyed')
})

/*
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    failureFlash: 'Invalid username or password.'
}))
*/

app.get('/login', (req, res) => {
    res.send('you need to login')
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {return next(err)}
        if (! user) {return res.send(info)}
        req.logIn(user, (err)=>{
            if (err) return next(err)
            return res.send({success: 1})
        })
    })(req, res, next)
})

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//backend runs!
app.listen(4000)