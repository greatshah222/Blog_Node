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
  //console.log(distance, lat, lng, latlng);
  res.status(200).json({
    status: 'success',
    results: blog.length,
    data: { blog: blog },
  });
});

exports.getDistancesFrom = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  if (!lat || !lng) {
    return next(
      new CustomError('Please enter both the latitude and longitude')
    );
  }
  // https://docs.mongodb.com/manual/geospatial-queries/
  // only aggregate pipeleine in geospatial and one of the field should be geospatial index. thats is why we are again using startLocation
  // newar=> from where to calculate the location
  // so lat.lng.
  // distanceField: the name given what will it be called
  //   db.places.aggregate( [
  //     {
  //        $geoNear: {
  //           near: { type: "Point", coordinates: [ -73.9667, 40.78 ] },
  //           spherical: true,
  //           query: { category: "Parks" },
  //           distanceField: "calcDistance"
  //        }
  //     }
  //  ] )
  const distances = await Blog.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'calcDistance',
        // this distnace is in m so changing to km we have to divide by 1000 and mongodb we can do by using distanceMultiplier.
        // we are using multiplier here cause unit can be miles or km and changing by using ternary operator above
        distanceMultiplier: multiplier,
      },
    },
    // keepimg only the distance and the name of the event
    {
      $project: {
        calcDistance: 1,
        name: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: { blog: distances },
  });
});
