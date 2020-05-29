const User = require('./../models/usermodel');
const factoryHandler = require('./factoryHandler');
const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');

exports.getUser = factoryHandler.getOne(User);
exports.updateUser = factoryHandler.updateOne(User);
exports.deleteUser = factoryHandler.deleteOne(User);
exports.getAllUsers = factoryHandler.getAll(User);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new CustomError('You cannot modify password from here', 400));
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
// to use the factory function the id must be supplied as a params so retrieving it from protect middleware and then passing as a params
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updatePassword = catchAsync(async (req, res, next) => {});
