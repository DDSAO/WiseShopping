const UserModel = require('../model/User')
const IndexModel = require("../model/Index")

const express = require("express");
const router = express.Router();

const {isAuth} = require('../initPassport')

router.get('/reset', isAuth, (req, res)=>{
    //reset index database 
    IndexModel.deleteMany({}, (err)=>{
        IndexModel.create({userIndex: 0})
    })
    UserModel.deleteMany({}, (err)=>{
        UserModel.create({
            uid: 0,
            password:"1",
            email: "example@email.com",
        }, () =>res.redirect('/user/all'))
    })
})


router.get('/', isAuth, (req, res) => {
    IndexModel.find({}, (err, results) => {
        if (err) console.log(err)
        res.send(results)
    })
})

router.get('/all', (req, res)=>{
    UserModel.find({},(err,results)=>{
        res.send(results)
    })
})

router.post('/addUser', (req, res)=> {
    IndexModel.findOneAndUpdate({}, {$inc:{userIndex: 1}}, (err, indexResult)=>{
        //handle error
        if (err) {
            if (error.name === 'MongoError' && error.code === 11000) {
                res.send({message: "email duplicated"})
            }
        } 
        const user = new UserModel({
            uid: indexResult.userIndex,
            password: req.body.password,
            email: req.body.email,
        })
        user.save((err, result)=>{
            if (err) res.send(err)
            if (result) {
                res.send(result)
            } 
        })
    })
})






module.exports = router;