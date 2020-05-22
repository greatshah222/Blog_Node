/* eslint-disable */
import axios from 'axios';
export const login = async (email, password) => {
  console.log(email, password);
  try {
    await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/login',
      data: {
        email: email,
        password: password,
      },
    });
    if (res.data.status === 'success') {
      alert('logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    alert(err);
  }
};
