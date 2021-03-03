const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    uid: {type:Number, required:true},
    password: {type:String, required:true},
    email: {type: String, required:true, unique:true},
    name: {type:String, required: true}
},  {collection: "Users"})

UserSchema.methods.verifyPassword = function(comingPassword) {
    return this.password === comingPassword
}


module.exports = mongoose.model('User', UserSchema)