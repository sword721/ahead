/**
 * Created with IntelliJ IDEA.
 * User: xuxiaoming
 * Date: 12-12-21
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Contact = mongoose.model('Contact')

/**
 * 控制面板页面
 * @param req
 * @param res
 */
exports.dashboard = function(req, res) {
  res.render('admin/dashboard', {
      title:'后台管理面板'
  });
};

/**
 * 留言管理页面
 * @param req
 * @param res
 */
exports.contacts = function(req, res) {
    var query = Contact.find().sort("-created_at");
    query.exec(function(error, contacts){
        res.render('admin/contacts',{
            title:'留言管理',
            contacts: contacts
        });
    });
};