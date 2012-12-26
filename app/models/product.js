/**
 * Created with IntelliJ IDEA.
 * User: xuxiaoming
 * Date: 12-12-21
 * Time: 下午5:13
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name:{type:String},
    title:{type:String},
    description:{type:String},
    created_at:{type:Date, default : Date.now()},
    finished_at:{type:Date, default : Date.now()},
    demo_url:{type:String}
});

ProductSchema.path('name').validate(function(name){
    return name.length > 0;
},'请输入案例名称');

ProductSchema.path('title').validate(function(title){
    return title.length > 0;
},'请输入案例简介');

ProductSchema.path('description').validate(function(description){
    return description.length > 0;
},'请输入案例详细介绍');

mongoose.model('Product', ProductSchema);
