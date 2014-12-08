/**
 * Created by JerryC on 2014/9/6.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BlogArticles = mongoose.model('BlogArticles',new Schema({
    title   :String,
    author  :String,
    brief   :String,
    content :String,
    markdown:String,
    html    :String,
    lastUpdateTime:{
        date:Date,
        year:String,
        month:String,
        day:String,
        minute:String
    },
    createTime:{
        date:Date,
        year:String,
        month:String,
        day:String,
        minute:String
    }
}).pre('save',function(next){
    console.log('in the pre save');
    var date = new Date();
    if(this.isNew){
        this.lastUpdateTime.date = this.createTime.date     = date;
        this.lastUpdateTime.year = this.createTime.year     = date.getFullYear();
        this.lastUpdateTime.month = this.createTime.month   = date.getFullYear() + "-" + (date.getMonth()+1);
        this.lastUpdateTime.day = this.createTime.day       = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        this.lastUpdateTime.minute = this.createTime.minute = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <10?'0'+date.getMinutes():date.getMinutes());
    }else{
        this.lastUpdateTime.date   = date;
        this.lastUpdateTime.year   = date.getFullYear();
        this.lastUpdateTime.month  = date.getFullYear() + "-" + (date.getMonth()+1);
        this.lastUpdateTime.day    = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
        this.lastUpdateTime.minute = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <10?'0'+date.getMinutes():date.getMinutes());
    }
    next();
}));

module.exports = BlogArticles;