'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  phoneNumber: {
    unique: true, //唯一
    type: String,
  },
});
