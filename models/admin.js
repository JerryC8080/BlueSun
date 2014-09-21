/**
 * Created by JerryC on 2014/9/6.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Admin = mongoose.model('Admin',new Schema({
    name:String,
    password:String,
    time:{
        date:Date,
        year:String,
        month:String,
        day:String,
        minute:String
    }
}));

module.exports = Admin;