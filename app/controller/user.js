const mongoose =require('mongoose');
const User = mongoose.model('User');

const Controller = {
  async signup(ctx) {
      console.log(ctx);
      console.log(ctx.query.phone);
    // const phone = ctx.request.body.
    ctx.body = {
      success: 'hello world',
    };
  },
  getMessage(ctx) {
    ctx.body = {
      success: 'get Something',
    };
  },
};
module.exports = Controller;
