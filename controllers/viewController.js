const catchAsync = require('./../utilis/catchAsync');
const Blog = require('./../models/blogModel');
const CustomError = require('./../utilis/customError');
const User = require('./../models/usermodel');
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
exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'All account',
  });
});
// exports.updateUserData = catchAsync(async (req, res, next) => {
//   const updatedUser = await User.findByIdAndUpdate(
//     req.user.id,
//     {
//       name: req.body.name,
//       email: req.body.email,
//     },
//     {
//       new: true,
//       runValidators: true,
//     }
//   );

//   res.status(200).render('account', {
//     title: 'welocme to your account',
//     user: updatedUser,
//   });
// });
