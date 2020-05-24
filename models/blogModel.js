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
  // it is (startLocation) for geospatial data
  startLocation: {
    type: {
      type: String,
      default: 'Point',
      // Don't do `{ startLocation: { type: String } }`
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  //start location is just some point describing on the earth but is not the documnent and actucal document is locations which needs to be in array fpor the embedding. for the locations an id will be created automatically since it is an embedded object and usually embeded object is within an array
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
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
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
