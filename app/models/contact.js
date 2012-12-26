/**
 * Created with IntelliJ IDEA.
 * User: xuxiaoming
 * Date: 12-12-21
 * Time: 下午2:22
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
    username: {type : String},
    email: {type : String},
    subject: {type : String},
    message: {type : String},
    telephone: {type : String},
    created_at : {type : Date, default : Date.now()}
});

ContactSchema.path('message').validate(function(message){
    return message.length > 0;
}, '请输入留言内容.');

function truncate(str, len) {
    if (!str) {
        return str;
    }
    return str.substring(0,len);
}

mongoose.model('Contact', ContactSchema);