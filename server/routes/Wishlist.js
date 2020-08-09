const model = require('../model/WishlistModel')
const express = require("express");
const router = express.Router();
const wishlsit = require('../model/WishlistModel')


router.get('/', (req, res) => {
    const getId = new Promise((resolve, reject) => {
        let id = wishlsit.getNextIndex()
        resolve(id)
    })
    getId.then((id) => {res.send('wishlist api<br>' + 'current wishlist index: '+ id)})
})

router.post('/addItem' , (req, res) => {
    
})

module.exports = router;