const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');
const Blog = require('./../models/blogModel');
const factoryHandler = require('./factoryHandler');

exports.createBlog = factoryHandler.createOne(Blog);
exports.getBlog = factoryHandler.getOne(Blog);
exports.updateBlog = factoryHandler.updateOne(Blog);
exports.deleteBlog = factoryHandler.deleteOne(Blog);
exports.getAllBlogs = factoryHandler.getAll(Blog);

// exports.getBlog = catchAsync(async (req, res, next) => {
//   const blog = await Blog.findById(req.params.id);
//   // .populate({
//   //   path: 'moderator',
//   //   select: '-__v',
//   // });
//   res.status(200).json({
//     status: 'success',
//     data: {
//       blog: blog,
//     },
//   });
// });
