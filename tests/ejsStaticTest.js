/**
 * Created by JerryC on 2014/9/18.
 */
var ejs = require('ejs');
var fs = require('fs');
var DBsettings = require(__dirname+'/DBsettings');
var mongoose = require('mongoose');
var blogArticles = require(__dirname+'/models/blogArticles');

//  连接数据库
mongoose.connect('mongodb://'+DBsettings.host+'/'+DBsettings.db,function(err){
    if(err) console.log(err);
});

blogArticles.find({},function(err,articles){
    if(err) console.log(err);
    for(var i = 0 ; i < articles.length ; i++){
        var html = loadData(articles[i]);
        var htmlFilename = articles[i]._id+'.html';
        var dirPath = __dirname+'/public/blog_articles_HTML/'+htmlFilename;
        fs.writeFile(dirPath,html,function(err){
            if(err) return err;
            console.log('An static html has been created,the dirPath is :'+dirPath);
        });
    }
});

function loadData(article){
    var filename = 'blog_article_template.ejs';

    var data = fs.readFileSync(__dirname+'/views/'+filename,'utf-8');
    if(data){
        var dir = data.toString();
        var content = ejs.render(dir,{
            cache:true,
            filename:filename,
            title:'Blue Sun',
            article:article
        });
        return content;
    }else{
        return null;
    }
}

