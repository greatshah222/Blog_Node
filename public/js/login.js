/* eslint-disable */
import axios from 'axios';

export const signup = async (name, email, password, passwordConfirm) => {
  console.log(email, password, passwordConfirm, name);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      alert('signed in  successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
  } catch (err) {
    alert(err);
  }
};
export const login = async (email, password) => {
  console.log(email, password);
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/users/login',
      data: {
        email: email,
        password: password,
      },
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      alert('logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
  } catch (err) {
    alert('not success ');
    alert(err);
  }
};
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/users/logout',
    });
    if ((res.data.status = 'success')) {
      alert('logged Out successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
  } catch (err) {
    alert(err);
  }
};
