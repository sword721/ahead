/**
 * Created with JetBrains WebStorm.
 * 服务类
 * User: xuxiaoming
 * Date: 12-12-6
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */
var express = require('express');
var http = require('http');
//require('express-namespace');
var fs = require('fs');
var env = 'development'
    , config = require('./config/config')[env]
    , auth = require('./authorization');
//var passport = require('passport');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


if(process.env.VCAP_SERVICES){
    var env1 = JSON.parse(process.env.VCAP_SERVICES);
    var mongo = env1['mongodb-1.8'][0]['credentials'];
    mongoose.connect(mongo.host, mongo.db, mongo.port);
} else {
    mongoose.connect(config.db);
}
//mongoose.connect("sTFoiFDjI5tr:CxXi9ZaGZn@127.0.0.1:20088/j22vxqtM1nJe");

var models_path = __dirname + '/app/models'
    , model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path+'/'+file)
});

//require('./config/passport').boot(passport, config);

var app = express();                                   // express app
require('./settings').boot(app, config);       // Bootstrap application settings

// Bootstrap routes
require('./config/routes')(app);

// Start the app by listening on <port>
var port = process.env.VCAP_APP_PORT || 3000;
var server = http.createServer(app).listen(port);
console.log('Express app started on port '+port);
