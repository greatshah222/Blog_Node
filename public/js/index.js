/* eslint-disable */
import 'core-js/stable';

import 'regenerator-runtime/runtime';
import { login, addFocus, removeFocus, logout, signup } from './login';
import { elements } from './base';

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
// if (elements.inputsForm) {
//   inputsForm.forEach((inputForm) => {
//     inputForm.addEventListener('focus', addFocus);
//     inputForm.addEventListener('blur', removeFocus);
//   });
// }
