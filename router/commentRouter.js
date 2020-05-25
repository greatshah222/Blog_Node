const express = require('express');
const commentController = require('./../controllers/commentController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
// mergeparams means it will get params from other router as well for example blogId from blog model
router
  .route('/')
  .get(commentController.getAllComments)
  .post(
    authController.protect,
    commentController.setTourAndUserIdForComments,
    commentController.createComment
  );
router
  .route('/:id')
  .get(commentController.getComment)
  .patch(authController.protect, commentController.updateComment)
  .delete(authController.protect, commentController.deleteComment);

module.exports = router;
