'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  // 电话登录
  userName: {
    unique: true, //唯一
    type: String,
  },
  password: String,
  phone: String,
  areaCode: String,
  verifyCode: String, // 验证码
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
