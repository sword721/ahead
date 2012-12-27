/**
 * Created with IntelliJ IDEA.
 * User: xuxiaoming
 * Date: 12-12-21
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Product = mongoose.model('Product'),
    _ = require('underscore');

/**
 * 前台产品列表页面
 * @param req
 * @param res
 */
exports.products = function(req, res) {
    var query = Product.find().sort('-created_at');
    query.exec(function(err, products){
        if (err){
            console.log(err);
        }
        res.render('products',{
            products:products
        });
    });
};

/**
 * 进入产品管理页面
 * @param req
 * @param res
 */
exports.admin_products = function(req, res){
    var query = Product.find().sort('-created_at');
    query.exec(function(err, products){
        if (err){
            console.log(err);
        }
        res.render('admin/products',{
            products:products
        });
    });
};

/**
 * 保存产品
 * @param req
 * @param res
 */
exports.save_product = function(req, res){
    var product = new Product(req.body);
    product.save(function(err){
        if (err){
            return res.render('admin/product_new',{
                errors:err,
                msg:''
            });
        }
        return res.redirect('admin/product_list');
    });
};

/**
 * 编辑产品案例
 * @param req
 * @param res
 */
exports.edit_product = function(req, res) {
    var id = req.params.id;
    var query = Product.findById(id);
    query.exec(function(err, product){
        if (err) {

        }
        res.render('admin/products/product_edit',{
            product:product
        });
    });
};

exports.update_product = function(req, res) {

    var query = Product.findById(req.body.id);
    query.exec(function(err,product){
        if (err){

        }
//        product = prod;

        product = _.extend(product, req.body);
        console.log(product);
        product.save(function(err){
            return res.redirect('admin/product_list');
        });

    });

};

/**
 * 进入新增产品的页面
 * @param req
 * @param res
 */
exports.new_product = function(req, res) {
    res.render('admin/products/product_new',{
        title:'新增产品'
    });
};

/**
 * 进入产品展示页面方法
 * @param req
 * @param res
 */
exports.product_show = function(req, res) {
    var id = req.params.id;
    var query = Product.findById(id);
    query.exec(function(err,product){
        if (err){

        }
        console.log(product);
        res.render('product_show',{
            product:product
        });

    });
};

/**
 * 删除产品案例方法
 * @param req
 * @param res
 */
exports.remove_product = function(req, res) {
    var id = req.params.id;
    var query = Product.findById(id);
    query.remove(function(err){
        if (err){
            console.log(err);
        }
        res.redirect('admin/product_list');
    });
};