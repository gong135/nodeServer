const jwt = require('jsonwebtoken');
const secretKey = 'cun2bi2hui2jiamiRuby';

module.exports = options => {
  console.log(1);
  return async function Check(ctx, next) {
    conso.log(2);
    await next();
    const raw = ctx.request.headers.authorization.split(' ').pop();
    let tokenData;
    try {
      tokenData = jwt.verify(raw, secretKey);
    } catch (error) {
      ctx.body = {
        message: error,
        error: 401,
      };
      return;
    }
    let user = await User.findOne({
      _id: tokenData._id,
    }).exec();
  };
};
