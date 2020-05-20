const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'please provide the password'],
    minlength: [8, 'please enter atleast 8 character'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please provide passwordConfirm'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'doesnot match with password',
    },
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
