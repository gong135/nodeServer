'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  // 电话登录
  phoneNumber: {
    unique: true, //唯一
    type: String,
  },
  areaCode: String,
  verifyCode: String, // 验证码
  accessToken: String,
  nickName: Stirng,
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

userSchema.pre('save', function(next){
    if(!this.isNew) {
        this.mata.updateAt = Date.now();
    }
});

module.exports = mongoose.model('User', userSchema);
