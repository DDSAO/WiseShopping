const UserModel = require('../model/User')
const IndexModel = require("../model/Index")

const express = require("express");
const router = express.Router();

const {isAuth} = require('../initPassport')



router.get('/', isAuth, (req, res) => {
    IndexModel.find({}, (err, results) => {
        if (err) console.log(err)
        res.send(results)
    })
})

router.get('/all', (req, res)=>{
    UserModel.find({},(err,results)=>{
        res.write("<Users>"+results+'\n')
        IndexModel.find({}, (err, results) => {
            res.write("<Index>"+results)
        })
    })
})

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

router.post('/verifyEmail', async (req, res)=> {
    let email = req.body.email
    //await sleep(2000)
    UserModel.findOne({email: email}, (err, result) => {
        if (err) console.log(err)
        if (result === null) {
            res.send({success:1})
        } else {
            res.send({success:0, message:"This email has been taken"})
        }
    }) 
})

router.post('/verifyName', async (req, res)=> {
    let name = req.body.name
    //await sleep(2000)
    UserModel.findOne({name: name}, (err, result) => {
        if (err) console.log(err)
        if (result === null) {
            res.send({success:1})
        } else {
            res.send({success:0, message:"This name has been taken"})
        }
    }) 
})

router.post('/createAccount', async (req, res)=> {
    //await sleep(4000)
    IndexModel.findOneAndUpdate({}, {$inc:{userIndex: 1}}, (err, indexResult)=>{
        //handle error
        if (err) {
            if (error.name === 'MongoError' && error.code === 11000) {
                res.send({success:0, message: "email duplicated"})
            }
        } 
        const user = new UserModel({
            uid: indexResult.userIndex,
            password: req.body.password,
            email: req.body.email,
            name: req.body.name
        })

        
        user.save((err, result)=>{
            if (err) res.send({...err, success:0})
            if (result) {
                console.log(result)
                res.send({success:1})
            } else {
                res.send({success:0})
            }
        })
    })
})






module.exports = router;