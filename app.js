var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('cookie-session');
var flash = require('connect-flash');
var http = require('http');
var mongoose = require('mongoose');

var DBsettings = require('./DBsettings');
var routes = require('./routes/index');
var admin = require('./routes/admin');
var users = require('./routes/users');

var app = express();


//  设置设置views文件夹为存放视图文件的目录。__dirname是全局变量，存储正在执行脚本的所在目录
app.set('views', path.join(__dirname, 'views'));

//  设置视图模版引擎为ejs
app.set('view engine', 'ejs');

//  flash 是一个在session中存储信息的特定区域
app.use(flash());

//  设置端口为process.env.PORT或者3000
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

//  connect内建的中间件，在开发环境下使用，在终端显示简单的日志
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//  Cookie解析的中间件
app.use(cookieParser());

//  connect内建的中间件，将根目录下的public文件夹设置为存放image、css、js等静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

//  使用session中间件
app.use(session({
    secret:'BlueSun',
    keys:['Blue','Sun'],
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    } //30 days , 通过设置maxAge值设置Cookie的生存期
}));

//  连接数据库
mongoose.connect('mongodb://'+DBsettings.host+'/'+DBsettings.db,function(err){
    if(err) console.log(err);
});

//  注册路由表
app.use('/', routes);
app.use('/JerryC_admin',admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    console.log("Here is dev error handler");
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/*
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("Here is pro error handler");
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
