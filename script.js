// script.js
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('#nav-menu');

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', !expanded);
  menu.classList.toggle('open');
});
