const mongoose = require('mongoose');
const User = mongoose.model('User');
const xss = require('xss');

const Controller = {
  async signup(ctx) {
    const phone = ctx.query.phone;
    let user = await User.findOne({ phone }).exec(); //这个就是一个 promise exec
    if (!user) {
      user = new User({ phone: xss(phone) });
    } else {
      user.verifyCode = '1231';
    }

    try {
      console.log('try');
      user = user.save();
    } catch (error) {
      console.log('err');
      ctx.body = {
        error,
      };
    }
    ctx.body = {
      url: ctx.url,
      query: ctx.query,
      querystring: ctx.querystring,
    };
  },
  getMessage(ctx) {
    ctx.body = {
      success: 'get Something',
    };
  },
};
module.exports = Controller;
