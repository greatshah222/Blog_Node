const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');
const Blog = require('./../models/blogModel');

exports.createBlog = catchAsync(async (req, res, next) => {
  const newBlog = await Blog.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      blog: newBlog,
    },
  });
});
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const blog = await Blog.find();
  res.status(200).json({
    status: 'success',
    data: {
      blog: blog,
    },
  });
});

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      blog: blog,
    },
  });
});
