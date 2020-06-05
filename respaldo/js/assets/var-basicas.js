const Ano = new Date().getFullYear()
const mq768 = window.matchMedia('(min-width: 768px)')
const mq1024 = window.matchMedia('(min-width: 1024px)')

function easeInOutCubic(t,b,c,d){
  t /= d/2
  if(t < 1) return c/2*t*t*t + b
  t -= 2
  return c/2*(t*t*t + 2) + b
}

function easeInOut(t,b,c,d){
  t /= d/2
  if(t < 1 ) return c/2*t*t + b
  t--
  return -c/2 * (t*(t-2) - 1) + b
}

function smoothScroll(e){
  e.preventDefault()
  const targetId = e.currentTarget.getAttribute("href")
  const targetPosition = document.querySelector(targetId).offsetTop
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition //- 80
  const duration = 1000
  let start = null

  window.requestAnimationFrame(step)
  function step(timestamp){
    if(!start) start = timestamp
    const progress = timestamp - start
    window.scrollTo(0, easeInOut(progress, startPosition, distance, duration))
    if(progress < duration) window.requestAnimationFrame(step)
  }
}

const Up = () =>{
  const targetPosition = 0
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  const duration = 750
  let start = null

  window.requestAnimationFrame(step)

  function step(timestamp){
    if(!start) start = timestamp
    const progress = timestamp -start
    window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration))
    if(progress < duration) window.requestAnimationFrame(step)
  }
}

//Funciones para crear ventana modal

// Añadir un objeto de atributos a un elemento
const addAttributes = (element, attrObj) =>{
  for(let attr in attrObj){
    if(attrObj.hasOwnProperty(attr)) element.setAttribute(attr, attrObj[attr])
  }
}

// Crear elementos con atributos e hijo
const createCustomElement = (element, attributes, children) =>{
  let customElement = document.createElement(element)
  if(children !== undefined) children.forEach(el =>{
    if(el.nodeType){
      if(el.nodeType === 1 || el.nodeType === 11) customElement.appendChild(el)
    }else{
      customElement.innerHTML += el
    }
  })
  addAttributes(customElement, attributes)
  return customElement
}

export {
  Ano,
  smoothScroll,
  Up,
  createCustomElement,
  mq768
}
