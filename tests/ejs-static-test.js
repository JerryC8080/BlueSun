/**
 * Created by JerryC on 2014/9/19.
 */

var DBsettings = require(__dirname+'/DBsettings');
var blogArticles = require('./../models/blogArticles');
var ejsStatic = require(__dirname+'/ejs-static');
var mongoose = require('mongoose');

//  连接数据库
mongoose.connect('mongodb://'+DBsettings.host+'/'+DBsettings.db,function(err){
    if(err) console.log(err);
});

var option = {
    savepath:__dirname+'/public/blog_articles_HTML/',
    templatename:'blog_article_template.ejs',
    templatepath:__dirname+'/views/',
    model:blogArticles
};

ejsStatic(option,function(err,status){
    if(err) return console.log(err);
    console.log(status);
});