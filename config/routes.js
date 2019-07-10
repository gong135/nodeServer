const Router = require('koa-router');
const User = require('../app/controller/user');
module.exports = function() {
  let router = new Router({
    perfix: '/', //项目前缀
  });
  router.get('/user/get', User.savePhone);
  router.post('/user/getInfo', User.getInfo);
  router.post('/user/signup', User.signup);
  return router;
};
