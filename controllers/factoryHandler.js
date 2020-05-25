const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    if (!newDoc) {
      return next(
        new CustomError('Could not create document.please try again', 404)
      );
    }
    res.status(201).json({
      status: 'success',
      data: {
        doc: newDoc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id);
    if (!doc) {
      return next(new CustomError('No document found', 404));
    }
    res.status(204).json({
      status: 'success',
      data: {
        doc: null,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new CustomError('No document found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc: doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const doc = await query;
    if (!doc) {
      return next(new CustomError('No document found', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc: doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // for getting comment for that specific blog
    let filter = {};
    if (req.params.blogId) {
      filter = { blog: req.params.blogId };
    }
    const doc = await Model.find(filter);
    res.status(200).json({
      status: 'success',
      totalNumber: doc.length,
      data: {
        doc,
      },
    });
  });
