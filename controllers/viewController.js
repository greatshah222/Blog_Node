const catchAsync = require('./../utilis/catchAsync');
const Blog = require('./../models/blogModel');
const CustomError = require('./../utilis/customError');

exports.getOverview = (req, res, next) => {
  res.status(200).render('main');
};
exports.getLogin = (req, res, next) => {
  res.status(200).render('login');
};
exports.getSignup = (req, res, next) => {
  res.status(200).render('signup');
};
exports.getBlogCreateForm = (req, res, next) => {
  res.status(200).render('blog_create');
};
exports.getAllEvent = catchAsync(async (req, res, next) => {
  const events = await Blog.find();
  res.status(200).render('event', {
    title: 'All events',
    events: events,
  });
});
exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Blog.findOne({ slug: req.params.slug }).populate({
    path: 'comments',
  });

  // req.blog.id = event._id;
  if (!event) {
    return next(new CustomError('No tour found', 404));
  }

  res.status(200).render('singleEvent', {
    title: 'All events',
    event: event,
  });
});
