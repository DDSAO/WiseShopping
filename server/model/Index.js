var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IndexSchema = new Schema({
    userIndex: {type:Number, require:true}
})

module.exports = mongoose.model('Index', IndexSchema)