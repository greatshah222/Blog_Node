import axios from 'axios';
export const updateUser = async (name, email) => {
  try {
    console.log(name, email);
    const res = await axios({
      method: 'Patch',
      url: 'http://127.0.0.1:3000/api/users/updateMe',
      data: {
        name: name,
        email: email,
      },
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      alert('changed  successfully');
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
  }
};
export const updatePassword = async (
  currentPassword,
  password,
  confirmPassword
) => {
  try {
    console.log(currentPassword, password, confirmPassword);
    const res = await axios({
      method: 'Patch',
      url: 'http://127.0.0.1:3000/api/users/updateMe',
      data: {
        currentPassword,
        password,
        confirmPassword,
      },
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      alert('changed  successfully');
      location.reload(true);
    }
  } catch (err) {
    console.log(err);
  }
};
