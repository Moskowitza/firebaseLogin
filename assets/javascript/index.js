import { ui, uiConfig } from './config.js';

const loginDiv = document.getElementById('login');
const userNav = document.getElementById('user');
const noUserNav = document.getElementById('noUser');
const loginModal = document.getElementById('firebaseui-auth-container');
function showModel(event) {
  event.preventDefault();
  console.log('fire off modal');
  noUserNav.setAttribute('class', hidden);
  const modal = document.createElement('div');
  modal.setAttribute('id', 'firebaseui-auth-container');
  document.body.append(modal);
  ui.start(`#firebaseui-auth-container`, uiConfig);
}
loginDiv.addEventListener('click', showModel);
