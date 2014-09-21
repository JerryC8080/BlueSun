/**
 * Created by JerryC on 2014/9/20.
 */

var savepath,filename,model;
var fs = require('fs');

module.exports = function(option,callback){
    if(!option.savepath) throw new Error('options requires "savepath"');
    if(!option.model) throw new Error('options requires "model"');
    if(!option.filename) throw new Error('options requires "filename"');

    savepath = option.savepath;
    model = option.model;
    filename = option.filename;

    model.find({},function(err,articles){
        if(err) return callback(err);
        var articlesJSON = JSON.stringify(articles);
        var str = 'window.'+filename+'='+articlesJSON;
        fs.writeFile(savepath+'/'+filename+'.js',str,function(err){
            if(err) return callback(err);
            console.log('An blog data js has been saved');
        });
        return callback(null);
    });
};