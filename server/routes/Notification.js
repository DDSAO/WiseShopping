const NotificationModel = require('../model/Notification')
const UserModel = require('../model/User')
const IndexModel = require('../model/Index')
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const {isAuth, hasRight} = require('../initPassport')


router.get('/', (req, res)=> {
    res.send('notification page')
})

router.get('/all', (req, res)=> {
    NotificationModel.find({}, (err, docs) => {
        res.send(docs)
    })
})

router.post('/fetch', hasRight, (req,res) => {
    NotificationModel.find({uid: req.user.uid}, (err, docs) => {
        if (err) {
            res.send({success:0, message:err})
        } else {
            console.log(docs)
            res.send({success:1, data:docs})
        }
    })
})

router.post('/addMany', (req, res)=> {
    NotificationModel.insertMany(req.body.notifications, (err, docs) => {
        if (err) {
            console.log(err)
            res.send({success:0, message:err})
        } else {
            res.send({success:1})
        }
    })
})

router.post('/delete', hasRight, (req, res) => {
    NotificationModel.findOneAndDelete({uid: req.user.uid, _id: req.body.nid}, (err, docs) => {
        if (err) {
            res.send({success:0, message:err})
        } else {
            res.send({success:1, data:docs})
        }
    })
})

module.exports = router;