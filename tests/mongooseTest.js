/**
 * Created by JerryC on 2014/9/10.
 */

var crypto = require('crypto');
var mongoose = require('mongoose');
var Admin = require('./../models/admin');
var blogArticles = require('../models/blogArticles');
var labArticles = require('../models/labArticles');
var notesArticles = require('../models/notesArticles');
var fs = require('fs');
var createData = require('../utils/create-data');

mongoose.connect('mongodb://localhost/BlueSun');

var date = new Date();

/*
new Admin({
    name:'admin',
    password:'123456',
    time:{
        date : date,
        year : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth()+1),
        day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
        minute :  date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() <10?'0'+date.getMinutes():date.getMinutes())
    }
}).save(function(err){
    if(err) return console.log(err);
    console.log('a admin has created');
});
*/

/*
var blogArticles = new blogArticles({
    title:'The first article',
    author:'JerryC',
    brief:'The first article....',
    content:'The first article.../nThe first article...'
});

blogArticles.save(function(err){
    if(err) return console.log(err);
    console.log('An articles has created');
});

setTimeout(function(){
    blogArticles.title = 'The first article updated';
    blogArticles.save(function(err){
        if(err) return console.log(err);
        console.log('An articles has updated');
    });
},2000);
*/

/*
mongoose.model('Admin').findById('540fcbd8eb0ac78c1b5386c5',function(err,admin){
    if(err) return console.log(err);
    var md5 = crypto.createHash('md5');
    var newPassword = md5.update(admin.password).digest('hex');
    admin.update({password:newPassword},function(err){
        if(err) return console.log(err);
    })
});
*/
/*
var labArticle = new labArticles({
    title:'A new lab articles',
    author:'JerryC',
    brief:'this is a lab artilces brief',
    url:'http://www.baidu.com'
});

labArticle.save(function(err,article){
    if(err) return console.log(err);
    console.log('a new lab articles has been saved success!');
});
*/
/*
blogArticles.find({},function(err,articles){
    articles.sort('createTime',-1);
    var articlesArray = new Array();
    articles.forEach(function(article){
        var id = article._id;
        articlesArray.push(id);
    });
    var articlesJSON = JSON.stringify(articlesArray);
    var str = 'window.blogArticles='+articlesJSON;
    console.log(str);
    fs.writeFile('public/data/blogArticles.js',str,function(err){
        if(err) return callback(err);
        console.log('An blog data js has been saved');
    });
});
*/

/*createData({
    savepath:'public/data',
    filename:'blogArticles.js',
    model:blogArticles
},function(err){
    if(err) return console.log(err);
});*/

//  批量生成blog articles 测试数据
function batchTest(model,amount){
    var i=1;
    while(i++<=amount){
        new model({
            title: 'Test Notes Articles--' + (i-1),
            author: 'JerryC',
            brief: 'This just a test articles!',
            content: 'This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!This just a test articles!'
        }).save(function (err) {
            if (err) return console.log(err);
            console.log('An articles has created');
        });
    }
}
batchTest(notesArticles,45);
/*

    for(var i = 0 ; i<20 ; i++){
        function f() {
            console.log(blogArticles);

        }
        f();
    }

*/


