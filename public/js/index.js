/* eslint-disable */
import 'core-js/stable';

import 'regenerator-runtime/runtime';
import { login, addFocus, removeFocus, logout, signup } from './login';
import { elements } from './base';
import { commentPost } from './comment';
import { createPost } from './createForm';
import { duration } from 'moment';

if (elements.signupForm) {
  elements.signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('nameSignup').value;
    const email = document.getElementById('emailSignup').value;
    const password = document.getElementById('passwordSignup').value;
    const passwordConfirm = document.getElementById('passwordConfirmSignup')
      .value;
    console.log(name, email, password, passwordConfirm);
    signup(name, email, password, passwordConfirm);
  });
}

if (elements.loginForm) {
  elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (elements.logoutBtn) {
  elements.logoutBtn.addEventListener('click', logout);
}
if (elements.commentForm) {
  elements.commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const comment = document.getElementById('postComment').value;
    const blogId = document.getElementById('blogId').value;
    console.log(comment, blogId);
    commentPost(comment, blogId);
  });
}
// if (elements.inputsForm) {
//   inputsForm.forEach((inputForm) => {
//     inputForm.addEventListener('focus', addFocus);
//     inputForm.addEventListener('blur', removeFocus);
//   });
// }

if (elements.createForm) {
  elements.createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('blogName').value;
    const startDates = document.getElementById('blogStartDates').value;
    const imageCover = document.getElementById('blogImageCover').value;
    const images = document.getElementById('blogImage').value;
    const summary = document.getElementById('blogSummary').value;
    const description = document.getElementById('blogDescription').value;
    const duration = document.getElementById('blogDuration').value;
    const latitude = document.getElementById('blogLatitude').value;
    const longitude = document.getElementById('blogLongitude').value;
    const startAddress = document.getElementById('blogAddress').value;
    const startDescription = document.getElementById('blogStartDescription')
      .value;
    console.log(longitude, latitude);
    const startCoordinates = [latitude, longitude];

    // console.log(name, startDates, ImageCover, Image, Summary, Description);
    createPost(
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
    );
  });
}
