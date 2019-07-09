const Controller = {
  async signup(ctx) {
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
