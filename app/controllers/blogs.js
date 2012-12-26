/**
 * Created with IntelliJ IDEA.
 * User: xuxiaoming
 * Date: 12-12-21
 * Time: 上午10:51
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Blog = mongoose.model('Blog');
/**
 * 公司博客首页
 * @param req
 * @param res
 */
exports.blogs = function(req, res) {
    var query = Blog.find().sort('-created_at');
    query.exec(function(err, blogs){
        res.render('blogs',{
            title:'公司博客',
            blogs:blogs
        });
    });
};

exports.blog_show = function(req, res){
    var id = req.params.id;
    var query = Blog.findById(id);
    query.exec(function(err, blog){
        res.render('blog_show',{
            title:' 公司博客',
            blog:blog
        });
    });
};

/**
 * 公司博客管理首页
 * @param req
 * @param res
 */
exports.blogs_admin = function(req, res){
    var query = Blog.find().sort('-created_at');
    query.exec(function(err, blogs){
        res.render('admin/blogs/blog_list',{
            title:'公司博客',
            blogs:blogs
        });
    });
};

/**
 * 新增博客页面
 * @param req
 * @param res
 */
exports.new_blog = function(req, res) {
    res.render('admin/blogs/blog_new');
};

/**
 * 保存博客内容
 * @param req
 * @param res
 */
exports.save_blog = function(req, res) {
    var blog = new Blog(req.body);
    blog.save(function(err){
        if(err) {
            res.render('admin/blogs/blog_new',{errors:err});
        }
        res.redirect('/admin/blog_list');
    });
};

/**
 * 删除博客内容
 * @param req
 * @param res
 */
exports.remove_blog = function(req, res) {

    var id = req.params.id;
    var cond = {_id:id};
    Blog.remove(cond,function(err){
        if(err) {
            res.render('blogs',{
                errors:err,
                msg:''
            });
        }
        res.redirect('/admin/blog_list');
    });
};