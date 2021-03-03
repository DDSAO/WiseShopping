var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var WishlistSchema = new Schema({
    uid: {type: Number, required: true},
    name: {type: String, required: true},
    wid: {type: Number, required: true},
    status: {type: Number, required: true}, //0 for todo, 1 for done, -1 for draft
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    currentIid: {type: Number, required: true},
    items: {},
}, {minimize: false, collection: "Wishlists"});

WishlistSchema.index({uid: 1})


module.exports = mongoose.model('Wishlist', WishlistSchema)