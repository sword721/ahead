/**
 * Created with IntelliJ IDEA.
 * User: xuxiaoming
 * Date: 12-12-21
 * Time: 下午2:20
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogSchema = new Schema({
    title:{type:String},
    introduction:{type:String},
    content:{type:String},
    created_at:{type:Date,default : Date.now()}
});

BlogSchema.path('title').validate(function(title){
    return title.length > 0;
},'请输入博客标题');

BlogSchema.path('content').validate(function(content){
    return content.length > 0;
},'请输入博客内容');

mongoose.model('Blog',BlogSchema);