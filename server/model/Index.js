var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndexSchema = new Schema({
    userIndex: {type:Number, require:true},
    wishlistIndex: {type:Number, require:true},
    notificationIndex: {type:Number, require:true},
}, {collection: "Indexes"})

module.exports = mongoose.model('Index', IndexSchema)