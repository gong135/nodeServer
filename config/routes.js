const Router = require('koa-router');
const User = require('../app/controller/user');
module.exports = function() {
  let router = new Router({
    perfix: '/', //项目前缀
  });
  router.post('/user/login', User.signin); //登录
  router.post('/user/logout', User.signup); //登出
  router.post('/user/signup', User.signup);  // 注册
  router.get('/user/info', User.getInfo);
  return router;
};
