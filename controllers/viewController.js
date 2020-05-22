const catchAsync = require('./../utilis/catchAsync');
const Blog = require('./../models/blogModel');

exports.getOverview = (req, res, next) => {
  res.status(200).render('main');
};
exports.getLogin = (req, res, next) => {
  res.status(200).render('login');
};
exports.getSignup = (req, res, next) => {
  res.status(200).render('signup');
};
exports.getAllEvent = catchAsync(async (req, res, next) => {
  const events = await Blog.find();
  res.status(200).render('event', {
    title: 'All events',
    events: events,
  });
});
