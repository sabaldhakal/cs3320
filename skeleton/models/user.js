var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
var UserSchema = mongoose.Schema({
    full_name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserSchema);