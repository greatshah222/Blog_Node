const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please enter the name'],
      unique: true,
      maxlength: [40, 'a name cannot be more than 40 character'],
      minlength: [10, ' a name must have atleast 10 character'],
    },
    slug: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a size'],
    },
    // ratingsAverage, ratingsQuantity and comment Quantity is stored in the blog model so that we dodnt have to query the comment model as well to get these results in our blog page

    commentsQuantity: {
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
    startDates: {
      type: [String],
      default: Date.now(),
    },
    // it is (startLocation) for geospatial data
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        // Don't do `{ startLocation: { type: String } }`
        enum: ['Point'],
        required: [true, 'Please enter the startLocation of the event'],
      },
      coordinates: {
        type: [Number],

        required: [
          true,
          'Please enter a co-ordinates of the startlocation for the event',
        ],
      },
      address: String,
      description: String,
    },
    // //start location is just some point describing on the earth but is not the documnent and actucal document is locations which needs to be in array fpor the embedding. for the locations an id will be created automatically since it is an embedded object and usually embeded object is within an array
    // // every event has the startLocation so it is in the model but the locations they can vary so they are embedded
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
          required: [
            true,
            'Please enter a co-ordinates of the startlocation for the event',
          ],
        },
        address: String,
        description: String,
        day: Number,
      },
    ],
    // embedding moderator into blog model
    // moderator: {
    //   type: Array,
    // },

    // refrencing Moderator cause if there is a chnge in info we have to change two data set blog and user. if there is mongoose.Schema.objectId it is refrenced type or also called normalized. we can than populate these data later
    moderator: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
blogSchema.index({ slug: 1 });
blogSchema.index({ startLocation: '2dsphere' });
blogSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// to get the moderator in our blog. it will give output lik e
// "moderator": [
//   {
//       "role": "admin",
//       "_id": "5c8a1d5b0190b214360dc057",
//       "name": "Jonas Schmedtmann",
//       "email": "admin@natours.io",
//       "__v": 0
//   }
// ],
// Remember this works only on save and u hhave to do it again in update. This mehod of embedding might not be suitable for our example cause if the moderator chnages to admin or to user, or change the email id  we have to change both in the blog model and as well as the user model

// blogSchema.pre('save', async function (next) {
//   const moderatorPromise = this.moderator.map(
//     async (id) => await User.findById(id)
//   );
//   // THIS MAP METHOD RETURNS US A PROMISE SINCE WE ARE AWAITING THERE
//   this.moderator = await Promise.all(moderatorPromise);
//   next();
// });

blogSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'moderator',
    select: '-__v',
  });
  next();
});

// virtual property accessing the comment from the comment section since it is parent refrencing blog does not know about comment
// comments is just the name given here
blogSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'blog',
  localField: '_id',
});
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
