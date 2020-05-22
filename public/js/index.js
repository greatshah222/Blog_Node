/* eslint-disable */
import 'core-js/stable';

import 'regenerator-runtime/runtime';
import { login } from './login';
import { elements } from './base';
console.log('fofb');

if (elements.loginForm) {
  elements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
