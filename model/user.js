const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
})

const User = mongoose.model('users', userSchema)

module.exports = User
