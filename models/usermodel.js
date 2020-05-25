const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
userSchema.pre('save', async function (next) {
  // if password is not modified it will go to next middleware
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.comparePassword = async function (
  candidatePassword,
  savedPasswordInDatabase
) {
  return await bcrypt.compare(candidatePassword, savedPasswordInDatabase);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
