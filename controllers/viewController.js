const catchAsync = require('./../utilis/catchAsync');

exports.getOverview = (req, res, next) => {
  res.status(200).render('base');
};
