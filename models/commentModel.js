const mongoose = require('mongoose');
const Blog = require('./blogModel');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'Comment Cannot be empty'],
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

// here we can get access of both blog and user in the comment section that is in this route we how are we gonna get access of comments in the blog section cause this is parents refrencing unlike in our moderator(user) in blog section where it was child refrencing. we dont want to do child refrencing cause we dont how long can the review get  and in the parents refrencing the parents doesnot about the child here in our case the blog and the user does not know about the comment so we need a virtual propery in our blog section to access them
commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

// static method called on the model not on instance of any document.TO use aggregation method we have to use the model and in the statics method this points to the model
// we need to call this method

// count total number of comments
commentSchema.statics.calculateTotalNumberOfComments = async function (blogId) {
  const stats = await this.aggregate([
    // match is like filter it will find the blog with that blogID
    {
      $match: { blog: blogId },
    },
    {
      // it groups the document by blog which is the name given in our model
      // it will group all the comment together belonging to this blogId
      $group: {
        _id: '$blog',
        nComment: { $sum: 1 },
      },
    },
  ]);
  console.log(stats);
  // this stat is an array
  if (stats.length > 0) {
    await Blog.findByIdAndUpdate(blogId, {
      commentsQuantity: stats[0].nComment,
    });
  } else {
    await Blog.findByIdAndUpdate(blogId, {
      commentsQuantity: 0,
    });
  }
};
// callimg the statics method for calculating the number of comment and avg rating and rating as well.
// this points to currentComment but we need to call the method in our Model
// this.constructor points to model
// use post cause if we use pre it will calculate the data before it was saved in the database
commentSchema.post('save', function () {
  this.constructor.calculateTotalNumberOfComments(this.blog);
});
// to update the comment number when there is deletion of comment
// this keyword is current query
commentSchema.pre(/^findOneAnd/, async function (next) {
  // this.r so that we can pass this data to the post middleware
  this.r = await this.findOne();
  console.log(this.r);
  next();
  // here the data is not persisted to db even if we delete the comment that is commentQuantity does not get updated
  // now we need to go to post middleware
});
// this.r gives use the query and to find the model we need to go this.r.constructor
commentSchema.post(/^findOneAnd/, async function () {
  // thi.r.blog cause we need to pass blog id in the calculateTotalNumberOfComments
  await this.r.constructor.calculateTotalNumberOfComments(this.r.blog);
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
