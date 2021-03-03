var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var NotificationSchema = new Schema({
    uid: { type: Number, required: true },
    name: {type: String, required: true},
    createdDate: { type: Number, default: Date.now },
}, {minimize: false, collection: "Notifications"});

NotificationSchema.index({uid: 1})


module.exports = mongoose.model('Notification', NotificationSchema)