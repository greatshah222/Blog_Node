/* eslint-disable */

export const elements = {
  loginForm: document.querySelector('.form-login'),
  inputsForm: document.querySelectorAll('.input'),
  logoutBtn: document.querySelector('.logout'),
  signupForm: document.querySelector('.form-signup'),
  commentForm: document.querySelector('.comment-form'),
  createForm: document.querySelector('.form-blog'),
  updateFormLocation: document.querySelector('.form-blog-location'),
  // we are getting all our location which in first hand was changed to text so that it can be put in html content and that content can be read by js now trnsferring it back to json
  mapBox: document.getElementById('map'),
  updateUserData: document.querySelector('.form-update-settings'),
  updateUserPassword: document.querySelector('.form-update-password'),
};
