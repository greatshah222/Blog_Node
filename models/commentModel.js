const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment Cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    blog: {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
      required: [true, 'a comment must belong to a blog'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'a comment must belong to auser'],
    },
  },
  // for virtual property
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
