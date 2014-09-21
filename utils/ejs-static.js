/**
 * Created by JerryC on 2014/9/19.
 */

var savepath,templatename,templatepath;
var fs = require('fs');
var ejs = require('ejs');

module.exports = function(option,callback){
    if(!option.savepath) throw new Error('option requires "savepath"');
    if(!option.templatename) throw new Error('option requires "templatename"');

    savepath = option.savepath;
    templatename = option.templatename;
    templatepath = option.templatepath;

    if(option.model){
        option.model.find({},function(err,articles){
            if(err) return callback(err,'error');
            for(var i = 0 ; i < articles.length ; i++){
                var html = loadData({article:articles[i]});
                var htmlFilename = articles[i]._id+'.html';
                fs.writeFile(savepath+htmlFilename,html,function(err){
                    if(err) return callback(err);
                    console.log('An static html has been created,the dirPath is :'+savepath+htmlFilename);
                });
            }
        });
    }else{
        if(option.articles) var object = {articles:option.articles};
        else var object = {};
        var html = loadData(object);
        fs.writeFile(savepath+option.filename,html,function(err){
            if(err) return callback(err);
            console.log('An static html has been created,the dirPath is :'+savepath+option.filename);
        });
    }
    return callback(null,'success');
};

function loadData(object){
    var data = fs.readFileSync(templatepath+templatename,'utf-8');
    if(data){
        object.cache = true;
        object.filename = templatepath+templatename;
        object.title = 'Blue Sun';
        var dir = data.toString();
        var content = ejs.render(dir,object);
        return content;
    }else{
        return null;
    }
}