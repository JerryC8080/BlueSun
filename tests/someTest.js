/**
 * Created by JerryC on 2014/9/19.
 */

var ejsStatic = require('../utils/ejs-static');
var notesArticles = require('../models/notesArticles');
var fs = require('fs');
var mongoose = require('mongoose');
var appPath = __dirname.replace('\\tests','');
var path = require('path');
mongoose.connect('mongodb://localhost/BlueSun');

/*console.log(__dirname);
console.log(path.dirname('/views/..'));
console.log(path+'/views/..');

console.log('appPath:'+appPath);*/

/*
var option = {
    savepath:'../public/',
    templatename:'index.ejs',
    templatepath:'../views/',
    filename:'index.html'
};
ejsStatic(option,function(err,status){
    if(err) return console.log(err);
    console.log(status);
});
*/

/*

var data = fs.readFileSync('g:\\Workspaces\\BlueSuns\\views\\notes_article_template.ejs','utf-8');
console.log(data);
*/

/*
var option = {
    savepath:'../public/notes_articles_HTML/',
    templatename:'notes_article_template.ejs',
    templatepath:'../views/',
    model:notesArticles
};
ejsStatic(option,function(err,status){
    if(err) return console.log(err);
    console.log(status);
});
*/
