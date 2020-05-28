import axios from 'axios';
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
  startDescription
) => {
  console.log(
    name,
    startDates,
    imageCover,
    images,
    summary,
    description,
    startAddress,
    startCoordinates,
    startDescription
  );
  try {
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

        'startAddress.address': startAddress,
        'startLocation.coordinates': startCoordinates,
        'startDescription.description': startDescription,
      },
    });
    console.log(res);
    if (res.data.status === 'success') {
      alert('signefd in  successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
  } catch (err) {
    console.log(err.response.data);
  }
};
