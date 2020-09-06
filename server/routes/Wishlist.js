const Wishlist = require('../model/Wishlist')
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const {isAuth} = require('../initPassport')


router.get('/', (req, res) => {
    res.send('wishlist page')
})


router.get('/reset',  async (req, res)=> {
    var wishlist = new Wishlist({
        name: "example",
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
    Wishlist.deleteMany({}, (err)=>{
        console.log("delete")
        wishlist.save(function (err) {
            if (err) console.log(err)
            console.log("done")
        })
    })
})

router.get('/fetchAll', async (req, res) => {
    res.send(await Wishlist.find({}))
})

router.get('/fetch/:wid', async (req, res) => {
    let wid = req.params.wid
    Wishlist.find({wid: wid}, (err, docs) => {
        if (err) console.log(err)
        if (docs.length) {
            res.send(docs[0]) //send the json object directly
        } else {
            res.send({errMessage:"wishlist not found"})
        }
    })
})

router.post('/addWishlist' , (req, res) => {
    let wishlist = new Wishlist(req.body)
    wishlist.save(function(err, docs) {
        if (err) console.log(err)
        console.log(docs)
        res.send(docs)
    })
})


module.exports = router;