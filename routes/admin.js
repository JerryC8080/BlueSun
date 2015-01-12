/**
 * Created by JerryC on 2014/9/14.
 */
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var Markdown = require("markdown").markdown;
var ejsStatic = require('../utils/ejs-static');
var Admin = require('../models/admin');
var blogArticles = require('../models/blogArticles');
var labArticles = require('../models/labArticles');
var noteArticles = require('../models/notesArticles');
var createData = require('../utils/create-data');
var fs = require('fs');
var config = require("../config.js");

// 控制访问权限的函数
function checkLogin(req,res,next){
    console.log("Here is checkLogin");
    if(!req.session.admin){
        res.redirect('/JerryC_admin/login');
    }else next();

}
function checkNotLogin(req,res,next){
    console.log("Here is checkNotLogin");
    if(req.session.admin) {
        //  返回之前的页面
        res.redirect('back');
    }else next();
}

//  管理主页
router.get('/',checkLogin);
router.get('/',function(req,res){
    res.render('admin/admin',{
        title:'Blue Sun',
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    });
});

//  登录
router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
    console.log("Here is /login");
    res.render('admin/login',{
        title:'Blue Sun',
        success:req.flash('success').toString(),
        error:req.flash('error').toString()
    });
});
router.post('/login',function(req,res){
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex'),
        name = req.body.name;
    Admin.findOne({name:name,password:password},function(err,admin){
        if(err) return console.log(err);
        if(admin){
            req.session.admin = admin;
            req.flash('success','Login successed!');
            res.redirect('/JerryC_admin');
        }else{
            console.log('can\'t find the user');
            req.flash('error','Login falied!');
            res.redirect('back');
        }
    });
});

//  登出
router.get('/logout', checkLogin);
router.get('/logout',function(req,res){
    req.session.admin = null;
    req.flash('success','登出成功');
    res.redirect('login');
});

//  管理副页
router.get('/admin_right',checkLogin);
router.get('/admin_right',function(req,res){
    res.render('admin/admin_right',{title:'Blue Sun'});
});

//  Blog List
router.get('/admin_blog_list',checkLogin);
router.get('/admin_blog_list',function(req,res){
    blogArticles.find().sort({'_id':-1}).exec(function(err,articles){
        if(err)return console.log(err);
        res.render('admin/admin_blog_list',{
            title:'Blue Sun',
            articles:articles
        });
    });
});

//  Add Blog Article
router.get('/admin_blog_add',checkLogin);
router.get('/admin_blog_add',function(req,res){
    res.render('admin/admin_blog_add',{
        title:'Blue Sun'
    });
});
router.post('/admin_blog_add',checkLogin);
router.post('/admin_blog_add',function(req,res){
    var title = req.body.title,
        author = req.body.author,
        brief = req.body.brief,
        content = req.body.content,
        markdown = req.body.markdown;
    var blogArticle = new blogArticles({
        title:title,
        author:author,
        brief:brief,
        content:content,
        markdown:markdown,
        html:Markdown.toHTML(markdown)
    });
    blogArticle.save(function(err){
        if(err) return console.log(err);
        console.log('A blog articles save successed');
        res.redirect('/JerryC_admin/admin_blog_list');
    });

});

//  Modify Blog Article
router.post('/admin_blog_modify',checkLogin);
router.post('/admin_blog_modify',function(req,res){
    var id = req.body.id;
    title = req.body.title,
        author = req.body.author,
        brief = req.body.brief,
        content = req.body.content;

    blogArticles.findById(id,function(err,article){
        if(err) return console.log(err);
        article.title = title;
        article.author = author;
        article.brief = brief;
        article.content = content;
        article.save(function(err,numberAffected,raw){
            if(err) return console.log(err);
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            res.json({status:'success'});
        });
    });
});

//  Delete Blog Article
router.post('/admin_blog_delete',checkLogin);
router.post('/admin_blog_delete',function(req,res){
    var id = req.body.id;
    blogArticles.remove({_id:id},function(err,numberAffected,raw){
        if(err) return console.log(err);
        console.log('The number of delete documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
        res.json({status:'error'});
    });
});

//  Lab List
router.get('/admin_lab_list',checkLogin);
router.get('/admin_lab_list',function(req,res){
    labArticles.find().sort({'_id':-1}).exec(function(err,articles){
        if(err)return console.log(err);
        res.render('admin/admin_lab_list',{
            title:'Blue Sun',
            articles:articles
        });
    });
});

//  Add Lab Article
router.get('/admin_lab_add',checkLogin);
router.get('/admin_lab_add',function(req,res){
    res.render('admin/admin_lab_add',{
        title:'Blue Sun'
    });
});
router.post('/admin_lab_add',checkLogin);
router.post('/admin_lab_add',function(req,res){
    console.log('Here is post /admin_lab_add');
    var title = req.body.title,
        author = req.body.author,
        brief = req.body.brief,
        url = req.body.url,
        imgUrl = req.body.imgUrl;
    var labArticle = new labArticles({
        title:title,
        author:author,
        brief:brief,
        url:url,
        imgUrl:imgUrl
    });
    labArticle.save(function(err){
        if(err) return console.log(err);
        console.log('A lab articles save successed');
        res.redirect('/JerryC_admin/admin_lab_list');
    });

});

//  Modify lab Article
router.post('/admin_lab_modify',checkLogin);
router.post('/admin_lab_modify',function(req,res){
    var id = req.body.id;
    title = req.body.title,
        author = req.body.author,
        brief = req.body.brief,
        url = req.body.url,
        imgUrl = req.body.imgUrl;

    labArticles.findById(id,function(err,article){
        if(err) return console.log(err);
        article.title = title;
        article.author = author;
        article.brief = brief;
        article.url = url;
        article.imgUrl = imgUrl;
        article.save(function(err,numberAffected,raw){
            if(err) return console.log(err);
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            res.json({status:'success'});
        });
    });
});

//  Delete lab Article
router.post('/admin_lab_delete',checkLogin);
router.post('/admin_lab_delete',function(req,res){
    var id = req.body.id;
    labArticles.remove({_id:id},function(err,numberAffected,raw){
        if(err) return console.log(err);
        console.log('The number of delete documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
        res.json({status:'error'});
    });
});

//  Note List
router.get('/admin_note_list',checkLogin);
router.get('/admin_note_list',function(req,res){
    noteArticles.find(function(err,articles){
        if(err)return console.log(err);
        res.render('admin/admin_note_list',{
            title:'Blue Sun',
            articles:articles
        });
    });
});

//  Add note Article
router.get('/admin_note_add',checkLogin);
router.get('/admin_note_add',function(req,res){
    res.render('admin/admin_note_add',{
        title:'Blue Sun'
    });
});
router.post('/admin_note_add',checkLogin);
router.post('/admin_note_add',function(req,res){
    var title = req.body.title,
        author = req.body.author,
        brief = req.body.brief,
        content = req.body.content;
    var noteArticle = new noteArticles({
        title:title,
        author:author,
        brief:brief,
        content:content
    });
    noteArticle.save(function(err){
        if(err) return console.log(err);
        console.log('A note articles save successed');
        res.redirect('/JerryC_admin/admin_note_list');
    });

});

//  Modify note Article
router.post('/admin_note_modify',checkLogin);
router.post('/admin_note_modify',function(req,res){
    var id = req.body.id;
    title = req.body.title,
        author = req.body.author,
        brief = req.body.brief,
        content = req.body.content;

    noteArticles.findById(id,function(err,article){
        if(err) return console.log(err);
        article.title = title;
        article.author = author;
        article.brief = brief;
        article.content = content;
        article.save(function(err,numberAffected,raw){
            if(err) return console.log(err);
            console.log('The number of updated documents was %d', numberAffected);
            console.log('The raw response from Mongo was ', raw);
            res.json({status:'success'});
        });
    });
});

//  Delete note Article
router.post('/admin_note_delete',checkLogin);
router.post('/admin_note_delete',function(req,res){
    var id = req.body.id;
    noteArticles.remove({_id:id},function(err,numberAffected,raw){
        if(err) return console.log(err);
        console.log('The number of delete documents was %d', numberAffected);
        console.log('The raw response from Mongo was ', raw);
        res.json({status:'error'});
    });
});

//  Web Tools
router.get('/admin_web_tools',checkLogin);
router.get('/admin_web_tools',function(req,res){
    res.render('admin/admin_web_tools',{
        title:'Blue Sun'
    });
});

//  Blog Articles Staticize
router.post('/admin_blog_articles_staticize',checkLogin);
router.post('/admin_blog_articles_staticize',function(req,res){
    var option = {
        savepath:config.static_path + '/blog_articles_HTML/',
        templatename:'blog_article_template.ejs',
        templatepath:'./views/',
        model:blogArticles
    };
    ejsStatic(option,function(err,status){
        if(err) return console.log(err);
        res.json(status);
    });
});

//  Notes Articles Staticize
router.post('/admin_notes_articles_staticize',checkLogin);
router.post('/admin_notes_articles_staticize',function(req,res){
    var option = {
        savepath:config.static_path + 'notes_articles_HTML/',
        templatename:'notes_article_template.ejs',
        templatepath:'./views/',
        model:noteArticles
    };
    ejsStatic(option,function(err,status){
        if(err) return console.log(err);
        res.json(status);
    });
});

//  Index Staticize
router.post('/admin_index_staticize',checkLogin);
router.post('/admin_index_staticize',function(req,res){
    var option = {
        savepath: config.static_path + '/',
        templatename:'index.ejs',
        templatepath:'views/',
        filename:'index.html'
    };
    ejsStatic(option,function(err,status){
        if(err) return console.log(err);
        res.json(status);
    });
});

//  Blog Staticize
router.post('/admin_blog_staticize',checkLogin);
router.post('/admin_blog_staticize',function(req,res){
    blogArticles.find({}).sort({'_id':-1}).limit(10).exec(function(err,articles){
        if(err){
            res.json('error');
            return console.log(err);
        }

        var option = {
            savepath:config.static_path + '/',
            templatename:'blog.ejs',
            templatepath:'views/',
            filename:'blog.html',
            articles:articles
        };

        ejsStatic(option,function(err,status){
            if(err) return console.log(err);
            res.json(status);
        });
    });
});

//  Lab Staticize
router.post('/admin_lab_staticize',checkLogin);
router.post('/admin_lab_staticize',function(req,res){

    labArticles.find({}).sort({'_id':-1}).exec(function(err,articles){
        if(err){
            res.json('error');
            return console.log(err);
        }
        articles.sort('createTime',-1);

        var option = {
            savepath:config.static_path + '/',
            templatename:'lab.ejs',
            templatepath:'views/',
            filename:'lab.html',
            articles:articles
        };

        ejsStatic(option,function(err,status){
            if(err) return console.log(err);
            res.json(status);
        });

    });
});

//  Notes Staticize
router.post('/admin_notes_staticize',checkLogin);
router.post('/admin_notes_staticize',function(req,res){

    noteArticles.find({}).sort({'_id':-1}).limit(10).exec(function(err,articles){
        if(err){
            res.json('error');
            return console.log(err);
        }
        articles.sort('createTime',-1);

        var option = {
            savepath:config.static_path + '/',
            templatename:'notes.ejs',
            templatepath:'views/',
            filename:'notes.html',
            articles:articles
        };

        ejsStatic(option,function(err,status){
            if(err) return console.log(err);
            res.json(status);
        });
    });
});

//  Blog Data Create
router.post('/admin_blog_data_create',checkLogin);
router.post('/admin_blog_data_create',function(req,res){
    createData({
        savepath:config.static_path + '/data',
        filename:'blogArticles',
        model:blogArticles
    },function(err){
        if(err) {
            res.json('error');
            return console.log(err);
        }
        res.json('success');
    });
});

//  Notes Data Create
router.post('/admin_notes_data_create',checkLogin);
router.post('/admin_notes_data_create',function(req,res){
    createData({
        savepath:config.static_path + '/data',
        filename:'notesArticles',
        model:noteArticles
    },function(err){
        if(err) {
            res.json('error');
            return console.log(err);
        }
        res.json('success');
    });
});

//  All Stations Generate HTML
router.post('/admin_all_staticize',checkLogin);
router.post('/admin_all_staticize',function(req,res){

});

//  Files Upload
router.post('/upload/upload_json',checkLogin);
router.post('/upload/upload_json',function(req,res){
    var path = req.files.imgFile.path;
    path = path.replace('public','..');
    console.log('fuck:'+path);
    res.json({
        "error":0,
        "url":path
    });
});

//  Files Manager
router.get('/upload/file_manager_json',checkLogin);
router.get('/upload/file_manager_json',function(req,res){
    console.log('Here is file_manager_json');
    fs.readdir(process.cwd()+'\\public\\images\\uploadImg',function(err,files){
        var fileList = new Array();
        var result = {};
        for(var i = 0 ; i < files.length ; i++){
            pushfile({},files[i],fileList);
        }

        result.moveup_dir_path = '';
        result.current_dir_path = '';
        result.current_url = '../images/uploadImg/';
        result.total_count = files.length;
        result.file_list = fileList;
        res.json(result);
    });

    function pushfile(file , files , fileList){
            file.is_dir = false;
            file.has_file = false;
            file.filesize = '';
            file.is_photo = true;
            file.filetype = 'jpg';
            file.filename = files.toString();
            file.datetime = '';
            fileList.push(file);
    }
});

module.exports = router;
