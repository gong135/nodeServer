const mongoose = require('mongoose');
const User = mongoose.model('User');
const xss = require('xss');

const Controller = {
  async savePhone(ctx, next) {
    const phone = ctx.query.phone;
    let user = await User.findOne({ phone }).exec(); //这个就是一个 promise exec
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
    await next();
    ctx.body = {
      url: ctx.url,
      query: ctx.query,
      querystring: ctx.querystring,
    };
  },
  async getInfo(ctx) {
    const name = ctx.params.name;
    await next();
    ctx.body = {
      success: true,
    };
  },
  async signup(ctx, next) {
    let { userName, password } = ctx.request.body;
    let user = await User.findOne({ userName }).exec(); //这个就是一个 promise exec
    if (!user) {
      user = new User({ userName: xss(userName), password });
      try {
        user = await user.save(user, function(err, res) {
          if (err) {
            console.log('失败');
            console.log(err.errmsg);
          }
          if (res) console.log('第一次新增成功：' + res);
        });
      } catch (error) {
        ctx.body = {
          error,
        };
      }
    }
    await next();
    // ctx.body = postData;
    // console.log(postData);
    // console.log(ctx.params);
    // const userName = ctx.params.name;
    // const password = ctx.params.name;
    // let user = await User.findOne({}).exec();
    // if (!user) {
    //   user = new User({ userName: xss(userName), password });
    //   user.save();
    // }
    // console.log(user);
    // await next();
    ctx.body = {
      success: true,
    };
  },
};
module.exports = Controller;
