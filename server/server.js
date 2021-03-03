require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const helmet = require("helmet");
const cors = require("cors")
const bodyParser = require("body-parser")
const {passport, isAuth} = require("./initPassport")
const flash = require('express-flash');
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);


//const localStrategy = require('passport-local').Strategy

//connect database
mongoose.connect('mongodb://localhost:27017/WiseShopping', 
    {useNewUrlParser: true, useUnifiedTopology: true, 
        useFindAndModify: false, useCreateIndex: true});

//Import Route
const wishlistRouter = require('./routes/Wishlist')
const userRouter = require('./routes/User')
const NotificationRouter = require('./routes/Notification')

//configure middlewares
app.use(cors({credentials: true, origin: ['http://localhost:3000','http://localhost:3006','http://dddsao.com','https://dddsao.com']}))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    store: new MongoStore({ 
        url: 'mongodb://localhost:27017/Session',
        autoRemove: 'native',
    }),
    saveUninitialized: true,
    cookie: { maxAge: 60000*30 }//30 min
}))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use('/wishlist', wishlistRouter)
app.use('/user', userRouter)
app.use('/notification', NotificationRouter)



//import mongoose schema
const UserModel = require('./model/User')
const IndexModel = require("./model/Index")
const WishlistModel = require('./model/Wishlist')
const NotificationModel = require('./model/Notification')
//Define route

app.get('/', (req, res) => {
    res.send('hello world')
})


app.get('/reset', (req, res) => {
    //reset index database 
    IndexModel.deleteMany({}, (err)=>{
        IndexModel.create({userIndex: 1, wishlistIndex:1})
    })
    UserModel.deleteMany({}, (err)=>{
        UserModel.create({
            uid: 0,
            password:"password",
            email: "admin@admin.com",
            name:"Admin"
        })
        res.write("user initialised\n")
    })
    var wishlist = new WishlistModel({
        name: "example",
        uid: 0,
        wid: 0,
        status: 0,
        createdDate: Date.now(),
        updatedDate: Date.now(),
        currentIid: 8,
        items: {
            0:{name: "Egg", Category: "egg", status: 0, iid:0},
            1:{name: "Beef", Category: "beef", status: 1, iid:1},
            2:{name: "chicken", Category: "chicken", status: 0, iid:2},
            3:{name: "Lamb", Category: "lamb", status: 0, iid:3},
            4:{name: "chicken", Category: "chicken", status: 0, iid:4},
            5:{name: "Lamb", Category: "lamb", status: 0, iid:5},
            6:{name: "chicken", Category: "chicken", status: 0, iid:6},
            7:{name: "Lamb", Category: "lamb", status: 0, iid:7},
        }
    })
    WishlistModel.deleteMany({}, (err)=>{
        wishlist.save(function (err) {
            if (err) console.log(err)
            res.write("wishlist initialised\n")
            NotificationModel.deleteMany({}, ()=>res.end("all done"))
        })
    })


})

/*
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    failureFlash: 'Invalid username or password.'
}))
*/

app.get('/login', (req, res) => {
    res.send({success: 0, message:"you need to log in first"})
})

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {return next(err)}
        if (! user) {return res.send(info)}
        req.logIn(user, (err)=>{
            if (err) return next(err)
            return res.send({success: 1, user:user})
        })
    })(req, res, next)
})

app.get('/logout', function(req, res) {
    req.logout();
    res.send({success:1})
});

//backend runs!
app.listen(4006)
