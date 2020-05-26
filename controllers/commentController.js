const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');
const Comment = require('./../models/commentModel');
const factoryHandler = require('./factoryHandler');

// for getting userID and tourId for operation related to comments

exports.setTourAndUserIdForComments = (req, res, next) => {
  // we have defined the name as blog in our parent refrenced property in the comment model. simillarly for the user as well
  if (!req.body.blog) {
    req.body.blog = req.params.blogId;
  }
  if (!req.body.user) {
    req.body.user = req.user.id;
  }
  if (!req.body.user || !req.body.blog) {
    return next(new CustomError('no id found'));
  }
  next();
};

exports.createComment = factoryHandler.createOne(Comment);
exports.getComment = factoryHandler.getOne(Comment);
exports.updateComment = factoryHandler.updateOne(Comment);
exports.deleteComment = factoryHandler.deleteOne(Comment);
exports.getAllComments = factoryHandler.getAll(Comment);
