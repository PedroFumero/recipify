const menuBtn = document.querySelector('.menu-btn')
const menu = document.querySelector('#menu')

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    // if (menu.classList.contains('invisible')) {
    menu.classList.toggle('invisible')
    // }
  })
}
