var express = require('express');
var router = express.Router();
var blogArticles = require('../models/blogArticles');
var notesArticles = require('../models/notesArticles');
var labArtilces = require('../models/labArticles');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Blue Sun',
        admin: req.session.admin
    });
});

//  Blog
router.get('/blog',function(req,res){
    blogArticles.find(function(err,articles){
        if(err) return console.log(err);
        articles.sort('createTime.date',1);
        res.render('blog',{
            title:'Blue Sun',
            articles:articles
        });
    });
});
router.get('/blog/:articleId',function(req,res){
    var articleId = req.params.articleId.toString().split('-')[1];
    blogArticles.findById(articleId,function(err,article){
        res.render('blog_article_template',{
            title:'Blue Sun',
            article:article
        })
    });
});

//  Notes
router.get('/notes',function(req,res){
    notesArticles.find(function(err,articles){
        if(err) return console.log(err);
        articles.sort('createTime.date',1);
        res.render('notes',{
            title:'Blue Sun',
            articles:articles
        });
    });
});
router.get('/notes/:articleId',function(req,res){
    var articleId = req.params.articleId.toString().split('-')[1];
    notesArticles.findById(articleId,function(err,article){
        res.render('notes_article_template',{
            title:'Blue Sun',
            article:article
        })
    });
});

router.get('/lab',function(req,res){
    labArtilces.find(function(err,articles){
        if(err) return console.log(err);
        articles.sort('createTime.date',1);
        res.render('lab',{
            title:'Blue Sun',
            articles:articles
        });
    });
});


module.exports = router;
