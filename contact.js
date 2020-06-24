var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Contact = new Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('Contact', Contact);