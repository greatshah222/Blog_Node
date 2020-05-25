const catchAsync = require('./../utilis/catchAsync');
const CustomError = require('./../utilis/customError');
const Blog = require('./../models/blogModel');
const factoryHandler = require('./factoryHandler');

exports.createBlog = factoryHandler.createOne(Blog);
// exports.getBlog = factoryHandler.getOne(Blog, { path: 'comments' });
exports.updateBlog = factoryHandler.updateOne(Blog);
exports.deleteBlog = factoryHandler.deleteOne(Blog);
exports.getAllBlogs = factoryHandler.getAll(Blog);

exports.getBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findById(req.params.id).populate({
    path: 'comments',
  });
  res.status(200).json({
    status: 'success',
    data: {
      blog: blog,
    },
  });
});
exports.getEventsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  // radius means total distance divided by earth radius
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(
      new CustomError('Please enter both the latitude and longitude')
    );
  }
  // startLocation means from where our event starts and if the user gives any distnace it will take startLocation as a refrence . if the user enters 200 km then this will give any event within 200 km of the startLocation of any event. so it will serch all event and gives us the document which is within the reach
  // https://docs.mongodb.com/manual/reference/operator/query-geospatial/
  // CENTERSPHERE returns the document that are within the boundaryo of the circle
  // example
  //   {
  //     <location field>: {
  //        $geoWithin: { $centerSphere: [ [ <x>, <y> ], <radius> ] }
  //     }
  //  }
  // centerSphere takes the array of lng,lat and distance(means radius which needs to be in radian ).
  // our distance should be converted to radian
  const blog = await Blog.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  console.log(distance, lat, lng, latlng);
  res.status(200).json({
    status: 'success',
    results: blog.length,
    data: { blog: blog },
  });
});
