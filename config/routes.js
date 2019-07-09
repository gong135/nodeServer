const Router = require('koa-router');
const User = require('../controller/user');
module.exports = function() {
  let router = new Router({
    perfix: '/', //项目前缀
  });
  router.get('/user/signup', User.getMessage);
  router.get('/hello/:name', (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
})
  router.post('/user/verify', User.signup);
  router.post('/user/update', User.signup);
  return router;
};
