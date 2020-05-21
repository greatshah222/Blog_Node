const catchAsync = require('./../utilis/catchAsync');

exports.getOverview = (req, res, next) => {
  res.status(200).render('main');
};
exports.getLogin = (req, res, next) => {
  res.status(200).render('login');
};
