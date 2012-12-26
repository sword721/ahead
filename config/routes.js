/**
 * 路由设置
 * Created with JetBrains WebStorm.
 * User: xuxiaoming
 * Date: 12-12-11
 * Time: 上午11:14
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');

module.exports = function(app) {
    var index = require('../app/controllers/index');
    app.get('/', index.index);
    app.get('/contact', index.contact);
    app.post('/contact', index.create_contact);
    app.get('/about', index.about);

    //blogs路由设置
    var blogs = require('../app/controllers/blogs');
    app.get('/blogs',blogs.blogs);
    app.get('/blog/:id',blogs.blog_show);

    //products路由设置
    var products = require('../app/controllers/products');
    app.get('/products',products.products);
    app.get('/product/:id',products.product_show);

    //admin路由设置
    var admin = require('../app/controllers/admin');
    app.get('/admin/dashboard', admin.dashboard);
    app.get('/admin/contacts', admin.contacts);
    app.get('/admin/new_blog', blogs.new_blog);
    app.post('/admin/save_blog',blogs.save_blog);
    app.get('/admin/blog_list', blogs.blogs_admin);
    app.get('/admin/new_product', products.new_product);
    app.post('/admin/save_product', products.save_product);
    app.get('/admin/product_list', products.admin_products);
    app.get('/admin/blog_delete/:id', blogs.remove_blog);
    app.get('/admin/product_delete/:id', products.remove_product);
    app.get('/admin/product_edit/:id', products.edit_product);
    app.post('/admin/update_product', products.update_product);
};
