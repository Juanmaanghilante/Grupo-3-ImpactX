const menu = document.querySelector('.svgMenu')
const close = document.querySelector('.closeBtn')
const nav = document.querySelector('nav')

menu.addEventListener('click', () => {
  nav.classList.add('open-nav')
})