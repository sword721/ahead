/*
 * GET home page.
 */
var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');

/**
 * 进入首页
 * @param req
 * @param res
 */
exports.index = function (req, res) {
    res.render('index', {
       title:'首页'
    });
};

exports.contact = function (req, res) {
    res.render('contact', {
       title:"联系我们",
       errors:"",
       msg:""
    });
};

exports.about = function (req, res) {
    res.render('about',{
       title:"关于我们"
    });
};

/**
 * 保存用户提交的留言
 * @param req
 * @param res
 */
exports.create_contact = function (req, res) {
    var contact = new Contact(req.body);
    contact.save(function(err){
        if (err) {
            console.log(err);
            return res.render('contact',{
                title:"联系我们",
                errors:err,
                msg:''
            });
        }
        res.render('contact',{
           title:'联系我们',
           errors:'',
           msg:'留言成功'
        });
    });
};

