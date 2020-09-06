var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var WishlistSchema = new Schema({
    name: {type: String, required: true},
    wid: {type: Number, required: true},
    status: {type: Number, required: true},
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    currentIid: {type: Number, required: true},
    items: {},
});


module.exports = mongoose.model('Wishlist', WishlistSchema)