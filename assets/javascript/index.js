import { ui, uiConfig } from './config.js';

export const showModal = function(event) {
  event.preventDefault();
  console.log('fire off modal');
  //   noUserNav.setAttribute('class', 'hidden');
  const modal = document.createElement('div');
  modal.setAttribute('id', 'firebaseui-auth-container');
  document.body.append(modal);
};
