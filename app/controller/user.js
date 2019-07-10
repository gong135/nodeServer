const mongoose = require('mongoose');
const User = mongoose.model('User');
const xss = require('xss');

const Controller = {
  async savePhone(ctx) {
    const phone = ctx.query.phone;
    let user = await User.findOne({ phone }).exec(); //这个就是一个 promise exec
    console.log(user);
    if (!user) {
      user = new User({ phone: xss(phone) });
    }
    try {
      user = user.save();
    } catch (error) {
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
  async getInfo(ctx) {
    const name = ctx.params.name;
    ctx.body = {
      success: true,
    }
  },
  async signup(ctx) {
    const name = ctx.params.name;
    ctx.body = {
      success: true,
    }
  }
};
module.exports = Controller;
