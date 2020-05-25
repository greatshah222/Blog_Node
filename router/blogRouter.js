const express = require('express');
const blogController = require('./../controllers/blogController');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');
const commentRouter = require('./commentRouter');
const router = express.Router();

router.use('/:blogId/comments', commentRouter);

// // for comments
// router
//   .route('/:blogId/comments')
//   .post(
//     authController.protect,
//     commentController.setTourAndUserIdForComments,
//     commentController.createComment
//   );
// here in the distance we put how far we want to check and in the latlng u put your current latlng, unit is either km or miles
// show all event within :distane(200) from user entered location(:latlng) in unit(km or miles)
router
  .route('/events-within/:distance/center/:latlng/unit/:unit')
  .get(blogController.getEventsWithin);
// distance to all the events from certain point(eg if the user enter latlng(co-ordinates) it will give how far is the startLoation event from the current co-ordinates)
router.route('/distance/:latlng/unit/:unit');
router
  .route('/')
  .get(blogController.getAllBlogs)
  .post(authController.protect, blogController.createBlog);
router
  .route('/:id')
  .get(blogController.getBlog)
  .patch(authController.protect, blogController.updateBlog)
  .delete(authController.protect, blogController.deleteBlog);

module.exports = router;
