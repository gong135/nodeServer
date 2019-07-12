'use strict';
const mongoose = require('mongoose');
const { enbcrypt } = require('../util/bcrypt');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  // 电话登录
  userName: {
    // unique: true, //唯一 这个东西使用了，这个数据库就这个 1 个数据了
    type: String,
  },
  password: {
    type: String,
    set(val) {
      // return bcrypt.hashSync(val, 10)
      return enbcrypt(val);
    },
  },
  phone: {
    type: String,
  },
  areaCode: String,
  verifyCode: String, // 验证码
  verified: {
    type:Boolean,
    default: false,
  },
  accessToken: String,
  nickName: String,
  gender: String,
  age: String,
  avatar: String,
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now(),
    },
    updateAt: {
      type: Date,
      dafault: Date.now(),
    },
  },
});

userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  next();
});


module.exports = mongoose.model('User', userSchema);
