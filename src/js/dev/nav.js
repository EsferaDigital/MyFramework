//Esto se puede mejorar metiendo las variables del DOM en un archivo aparte y luego importandolas acá.

import {smoothScroll, Up} from '../lib/var-basicas'

const toggleNav = () =>{
  const d = document,
  panel = d.querySelector('.Panel'),
  panelBtn = d.querySelector('.Panel-btn')

  panelBtn.addEventListener('click', e => {
    e.preventDefault()
    panelBtn.classList.toggle('is-active')
    panel.classList.toggle('is-active')
  })
}

const scrollNav = () =>{
  const d = document,
  panel = d.querySelector('.Panel'),
  panelBtn = d.querySelector('.Panel-btn')
  const itemLinks = d.querySelectorAll(".Menu-link")

  itemLinks.forEach(elem => elem.addEventListener('click', navBarClick))

  function navBarClick(e){
    smoothScroll(e);
    panelBtn.classList.toggle('is-active')
    panel.classList.toggle('is-active')
  }
}

const toggleHeader = () =>{
  const h = document.getElementById('Header')
  let lastScrollTop = 0;
  // al hacer scroll aumenta el valor de sctop
  let sctop = document.documentElement.scrollTop
  let st = window.pageYOffset || document.documentElement.scrollTop

  if(st > lastScrollTop){
    h.classList.remove('slide-down')
    h.classList.add('slide-up')
    // console.log(sctop + "b")
  }else if(sctop === 0){
    h.classList.remove('slide-up')
    h.classList.add('slide-down')
  }

  lastScrollTop = st

}

const showButton = () =>{
  const b = document.getElementById('ButtonTop')

  if(window.pageYOffset > 300){
    b.style.display = "block"
  }else{
    b.style.display = "none"
  }
}

const bgColorHeader = () =>{
  const h = document.getElementById('Header')
  if(window.pageYOffset > 0){
    h.style.backgroundColor = "#1F5764";
  }else{
    h.style.backgroundColor = "transparent"
  }
}

const animaHeader = () =>{window.addEventListener('scroll', toggleHeader, false)}
const colorHeader = () =>{window.addEventListener('scroll', bgColorHeader)}

const showButtonUp = () =>{window.addEventListener('scroll', showButton )}
const upToTop = () =>{
  const b = document.getElementById('ButtonTop')
  b.addEventListener('click', Up)
}


export {
  toggleNav,
  scrollNav,
  animaHeader,
  colorHeader,
  showButtonUp,
  upToTop
}
