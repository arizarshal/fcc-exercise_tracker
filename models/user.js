const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:  String
  }, 
  {versionKey: false}
)

const User = mongoose.model('User', userSchema)

module.exports = User