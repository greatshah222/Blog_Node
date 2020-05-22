const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter the name'],
    unique: true,
    maxlength: [40, 'a name cannot be more than 40 character'],
    minlength: [10, ' a name must have atleast 10 character'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'rating must be at least 1'],
    max: [5, 'rating must be less than 5'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A event  should have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a imgae'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
