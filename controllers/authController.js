const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./../models/usermodel');
const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
// Let’s say we have a user and we want to add that user data in the cookie then we have to add that cookie to the response using the following code :                      res.cookie(name_of_cookie, value_of_cookie);. the name of our cookie is jwt put it whateever u want and we want to store token .so token. you can also store other value such as in cookieOptions

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // res.cookie(name_of_cookie, value_of_cookie)
  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;
  user.active = undefined;
  res.status(statusCode).json({
    status: 'success',
    token: token,
    data: {
      user: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  createSendToken(newUser, 201, res);
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

  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new CustomError('You are not logged in.Please login to get access.', 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new CustomError('The user belonging to this token no longer exists', 401)
    );
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      req.user = currentUser;
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  // if there is no cookie
  next();
};

exports.logout = (req, res, next) => {
  res.cookie('jwt', 'You Are Logged Out', {
    expiresIn: new Date(Date.now() + 100 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.updatepassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!user.comparePassword(req.body.currentPassword, user.password)) {
    return next(new CustomError('password does not match', 401));
  }
  // dont use findby id and update cause our validation for changing pwd into hash worls only on save and newly created documnt
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user, 201, res);
});
