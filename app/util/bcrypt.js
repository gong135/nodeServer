const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(10);

const enbcrypt = password => {
  return bcrypt.hashSync(password, salt);
};

const validate = (password, hash) => {
  // 传过来的密码和数据存储的 hash 密码
  return bcrypt.compareSync(password, hash);
};

module.exports = {
  enbcrypt,
  validate,
};
