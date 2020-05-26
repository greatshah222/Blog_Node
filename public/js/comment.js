/* eslint-disable */

import axios from 'axios';
/* eslint-disable */
export const commentPost = async (comment, blogId) => {
  console.log(comment);

  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/blogs/${blogId}/comments`,
      data: { comment: comment },
    });
    if (res.data.status === 'success') {
      alert('successful');
      location.reload(true);
    }
    console.log(res);
  } catch (err) {
    console.log(err.response.data.message);
  }
};
