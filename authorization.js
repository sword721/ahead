/**
 * Created with JetBrains WebStorm.
 * User: xuxiaoming
 * Date: 12-12-11
 * Time: 上午11:59
 * To change this template use File | Settings | File Templates.
 */

/**
 * 加入登录权限校验
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
};


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.redirect('/users/'+req.profile.id);
        }
        next();
    }
};


/*
 *  Article authorizations routing middleware
 */

exports.article = {
    hasAuthorization : function (req, res, next) {
        if (req.article.user.id != req.user.id) {
            return res.redirect('/articles/'+req.article.id);
        }
        next();
    }
};

