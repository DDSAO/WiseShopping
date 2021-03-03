const WishlistModel = require('../model/Wishlist')
const UserModel = require('../model/User')
const IndexModel = require('../model/Index')
const express = require("express");
const router = express.Router();
const {isAuth, hasRight} = require('../initPassport')


router.get('/', (req, res) => {
    res.send('wishlist page')
})

router.get('/all', async (req, res) => {
    res.send(await WishlistModel.find({}))
})


router.get('/reset',  async (req, res)=> {
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
    var wishlist2 = new WishlistModel({
        ...wishlist,
        name: "past example",
        status: 1,
    })
    WishlistModel.deleteMany({}, (err)=>{
        wishlist.save((err) => {
            wishlist2.save((err)=>console.log(err))
        })
    })
})

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

//fetch all wishlists for a specific user
router.get('/fetch/todo/:uid/', isAuth, async (req, res) => {
    //await sleep(2000)
    let uid = req.params.uid
   
    if (req.user.uid === parseInt(uid)) {
        WishlistModel.find({uid: uid, status:0},(err, docs) => {
            if (err) console.log(err)
            res.send({success:1, data:docs})
        })
    } else {
        res.send({success: 0, message:"you cant view others' wishlist"})
    }
})

router.get('/fetch/past/:uid/', isAuth, async (req, res) => {
    let uid = req.params.uid
    if (req.user.uid === parseInt(uid)) {
        WishlistModel.find({uid: uid, status:1},(err, docs) => {
            if (err) console.log(err)
            res.send({success:1, data:docs})
        })
    } else {
        res.send({success: 0, message:"you cant view others' wishlist"})
    }
})
router.get('/fetch/draft/:uid/', isAuth, async (req, res) => {
    let uid = req.params.uid
    if (req.user.uid === parseInt(uid)) {
        WishlistModel.findOne({uid: uid, status:-1},(err, docs) => {
            if (err) console.log(err)
            res.send({success:1, data:docs})
        })
    } else {
        res.send({success: 0, message:"you cant view others' wishlist"})
    }
})

/*
router.get('/fetch/:wid', async (req, res) => {
    let wid = req.params.wid
    WishlistModel.find({wid: wid}, (err, docs) => {
        if (err) console.log(err)
        if (docs.length) {
            res.send(docs[0]) //send the json object directly
        } else {
            res.send({errMessage:"wishlist not found"})
        }
    })
})
*/


router.post('/addWishlist', hasRight, (req, res) => {
    IndexModel.findOneAndUpdate({}, {$inc:{wishlistIndex: 1}}, (err, index) => {
        if (err) console.log(err)
        const draft = req.body.draft
        if (! draft.items) {
            draft.items = []
        }
        let wishlist = new WishlistModel({
            ...req.body.draft,
            uid: req.user.uid,
            wid: index.wishlistIndex,
        })
        
        wishlist.save(function(err, result) {
            if (err) {
                res.send({success: 0, message: err})
            } else {
                console.log(result)
                res.send({success: 1})
            }
        })
    })
    
    
})

router.post('/changeWishlist', hasRight, (req, res)=>{

    WishlistModel.findOneAndUpdate(
        {wid:req.body.wid}, 
        req.body.updatedWishlist,
        (err, result) => {
            if (err) {
                res.send({success: 0, message: err})
            } else {
                res.send({success: 1, message: result})
            }
        })
})

router.post('/removeWishlist', hasRight, (req, res)=>{
    WishlistModel.deleteOne({wid: req.body.wid}, (err, docs) => {
        if (err) {
            res.send({success: 0, message: err})
        } else {
            res.send({success: 1})
        }
    })
})

router.post('/saveAsPast', hasRight, (req, res)=>{
    WishlistModel.findOneAndUpdate({wid:req.body.wid}, {$set:{status: 1}}, { overwrite: true },
        (err, result) => {
            if (err) {
                res.send({success: 0, message: err})
            } else {
                res.send({success: 1, message: result})
            }
        })
})



module.exports = router;