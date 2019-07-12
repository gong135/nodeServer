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
    if (!user) {
      ctx.body = {
        message: '用户登录过期！',
        error: 401,
      };
      return;
    }
    let fields = ['avatar', 'gender', 'age', 'nickName'];
    fields.forEach(el => {
      console.log(ctx.request.body[el]);
      if (ctx.request.body[el]) {
        user[el] = ctx.request.body[el];
      }
    });
    console.log(user);
    try {
      user = await user.save();
    } catch (error) {
      ctx.body = {
        message: '用户更新失败',
        error: 513,
      };
    }
    ctx.body = {
      message: '用户更新成功',
      success: true,
    };
  },
  async signup(ctx, next) {
    let { userName, password } = ctx.request.body;
    if(!userName || !password) {
      ctx.body= {
        message: '无效登录',
        code: 424,
      }
      return;
    }
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
        user = await user.save();
      } catch (error) {
        ctx.body = {
          message: error,
          error: 511,
        };
        return;
      }
    } else {
      ctx.body = {
        result: {
          message: '用户已经存在',
          error: 510,
        },
      };
      return;
    }
    ctx.body = {
      result: {
        message: '注册成功',
        success: true,
      },
    };
  },
  async login(ctx, next) {
    const {userName, password } = ctx.request.body;
    let user = await User.findOne({
      userName,
    }).exec();
    if(!user) {
      ctx.body ={
        message: '用户不存在',
      }
    }
    await next();
  },
};
module.exports = Controller;
