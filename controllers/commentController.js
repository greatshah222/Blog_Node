const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');
const Comment = require('./../models/commentModel');
const factoryHandler = require('./factoryHandler');

exports.createComment = factoryHandler.createOne(Comment);
exports.getComment = factoryHandler.getOne(Comment);
exports.updateComment = factoryHandler.updateOne(Comment);
exports.deleteComment = factoryHandler.deleteOne(Comment);
exports.getAllComments = factoryHandler.getAll(Comment);
