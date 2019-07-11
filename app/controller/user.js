const mongoose = require('mongoose');
const User = mongoose.model('User');
const xss = require('xss');
const uuid = require('uuid');

const Controller = {
  async savePhone(ctx, next) {
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
  async updateUser(ctx, next) {
    let { accessToken } = ctx.request.body;
    let user = await User.findOne({
      accessToken,
    }).exec();
    if(!user) {
      ctx.body = {
        message: '用户登录过期！',
        error: 401,
      }
    }
  },
  async signup(ctx, next) {
    let { userName, password } = ctx.request.body;
    await next();
    let user = await User.findOne({ userName }).exec(); //这个就是一个 promise exec
    if (!user) {
      let accessToken = uuid.v4();
      user = new User({
        userName: xss(userName),
        password,
        accessToken,
        avatar:
          'https://i1.hdslb.com/bfs/face/a809a3b8407840ae00032360108261fcf503d38a.jpg@52w_52h.webp',
      });
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
          message: error,
          error: 511,
        };
      }
    } else {
      ctx.body = {
        result: {
          message: '用户已经存在',
          error: 510,
        },
      };
    }
  },
  async login(ctx, next) {
    await next();
  },
};
module.exports = Controller;
