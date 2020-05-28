import axios from 'axios';
const Blog = require('./../../models/blogModel');
export const createPost = async (
  name,
  startDates,
  imageCover,
  images,
  summary,
  description,
  duration,
  startAddress,
  startCoordinates,
  startDescription,
  maxGroupSize,
  locationAddress,
  locationCoordinates,
  locationDescription,
  locationDay
) => {
  try {
    console.log(
      locationAddress,
      locationCoordinates,
      locationDescription,
      locationDay
    );
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/blogs/',
      // it is the form of key:value pair where value means the ddata written into form
      data: {
        startDates,
        name,
        imageCover,
        images,
        summary,
        description,
        duration,

        'startLocation.address': startAddress,
        'startLocation.coordinates': startCoordinates,
        'startLocation.description': startDescription,
        maxGroupSize,
        'locations.coordinates': locationCoordinates,
        'locations.address': locationAddress,
        'locations.description': locationDescription,
        'locations.day': locationDay,
      },
    });
    console.log(res);

    if (res.data.status === 'success') {
      alert('created successfully');
      // location.reload();
      // window.setTimeout(() => {
      //   location.assign(`/events/event/${event.slug}`);
      // }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
