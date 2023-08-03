console.log('holaaa!')
const menu = document.querySelector('.svgMenu')
const close = document.querySelector('.closeBtn')
const nav = document.querySelector('#navPrincipal')

menu.addEventListener('click', () => {
  nav.classList.add('open-nav')
})

close.addEventListener('click', () => {
  nav.classList.remove('open-nav')
})