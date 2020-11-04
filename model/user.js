const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
})

// 借助钩子函数在密码保存之前加密
userSchema.pre('save', async function (next) {
  const {password} = this;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  this.password = hash;
  next();
})

// 根据邮箱查找

const User = mongoose.model('users', userSchema)
User.getUserByUsername = async function (username) {
  return await User.find({
    username
  })
}

module.exports = User
