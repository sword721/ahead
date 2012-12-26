/**
 * Created with JetBrains WebStorm.
 * User: xuxiaoming
 * Date: 12-11-27
 * Time: 上午11:30
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
var mongoStore = require('connect-mongodb');

var generate_mongo_url = function(obj){
    obj.hostname = (obj.hostname || 'localhost');
    obj.port = (obj.port || 27017);
    obj.db = (obj.db || 'test');
    if(obj.username && obj.password){
        return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
    else{
        return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
    }
}

if(process.env.VCAP_SERVICES){
    var env = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env['mongodb-1.8'][0]['credentials'];
}
else{
    var mongo = {
        "hostname":"localhost",
        "port":27017,
        "db":"ahead"
    }
}
var mongourl = generate_mongo_url(mongo);

exports.boot = function(app, config) {
    bootApplication(app, config);
};



function bootApplication(app, config) {

    app.configure(function(){
        app.set('showStackError', true);

        app.use(express.static(__dirname+'/public'));
        app.use(express.logger(':method :url :status'));
        app.set('views', __dirname+'/app/views');
        app.set('view engine', 'ejs');
        app.use(express.logger(':method :url :status'))

        // dynamic helpers
        app.use(function (req, res, next) {
            res.locals.appName = 'Ahead';
            res.locals.title = 'Ahead';
            res.locals.showStack = app.showStackError;
            res.locals.req = req;

            res.locals.escapeHtml = function escapeHtml(unsafe) {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };
            res.locals.formatDate = function (date) {
                var monthNames = [ "一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月" ];
                return monthNames[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear() + ' '
                    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            };
            res.locals.stripScript = function (str) {
                return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            };
            res.locals.createPagination = function (pages, page) {
                var url = require('url')
                    , qs = require('querystring')
                    , params = qs.parse(url.parse(req.url).query)
                    , str = '';

                params.page = 0;
                var clas = page == 0 ? "active" : "no";
                str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">First</a></li>';
                for (var p = 1; p < pages; p++) {
                    params.page = p;
                    clas = page == p ? "active" : "no";
                    str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">'+ p +'</a></li>';
                }
                params.page = --p;
                clas = page == params.page ? "active" : "no";
                str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">Last</a></li>';

                return str;
            };

            next();
        });



        // cookieParser should be above session
        app.use(express.cookieParser());

        // bodyParser should be above methodOverride
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        app.use(express.session({
            secret: 'secret_meteoric',
            store: new mongoStore({
                url: mongourl,
                collection : 'sessions'
            })
        }));

//        app.use(passport.initialize());
//        app.use(passport.session());

        app.use(express.favicon());

        // routes should be at the last
        app.use(app.router);

        // assume "not found" in the error msgs
        // is a 404. this is somewhat silly, but
        // valid, you can do whatever you like, set
        // properties, use instanceof etc.
        app.use(function(err, req, res, next){
            // treat as 404
            if (~err.message.indexOf('not found')) return next();

            // log it
            console.error(err.stack);

            // error page
            res.status(500).render('500')
        });

//        assume 404 since no middleware responded
        app.use(function(req, res, next){
            res.status(404).render('404')
        })

    });

    app.set('showStackError', false);
}
