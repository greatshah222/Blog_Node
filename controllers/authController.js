const jwt = require('jsonwebtoken');
const User = require('./../models/usermodel');
const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  console.log(newUser);
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  newUser.password = undefined;
  newUser.passwordConfirm = undefined;
  res.status(201).json({
    status: 'success',
    token: token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError('please enter both the credential', 400));
  }
  const user = await User.findOne({ email: req.body.email }).select(
    '+password'
  );
  console.log(user);
  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new CustomError('Incorrect credential', 401));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  res.status(200).json({
    status: 'success',
    token: token,
    data: {
      user: user,
    },
  });
});
