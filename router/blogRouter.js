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
