const carruselNormal = function sliderNormal(){
  const carrusel = document.querySelector('.Slider-content')
  const carruselItem = document.querySelectorAll('.Slider-content img')
  const prevBtn = document.getElementById('Prev')
  const nextBtn = document.getElementById('Next')

  //Contador
  let contador = 1
  const ancho = carruselItem[0].clientWidth

  carrusel.style.transform = 'translateX(' + (-ancho * contador) + 'px)'

  //Capturamos evento en botones
  nextBtn.addEventListener('click', () => {
    if(contador >= carruselItem.length -1) return
    carrusel.style.transition = 'transform 0.5s ease-in-out'
    contador++
    carrusel.style.transform = 'translateX(' + (-ancho * contador) + 'px)'
  })

  prevBtn.addEventListener('click', () => {
    if(contador <= 0) return
    carrusel.style.transition = 'transform 0.5s ease-in-out'
    contador--
    carrusel.style.transform = 'translateX(' + (-ancho * contador) + 'px)'
  })

  carrusel.addEventListener('transitionend', () => {
    if(carruselItem[contador].id === 'lastClone'){
      carrusel.style.transition = 'none'
      contador = carruselItem.length - 2
      carrusel.style.transform = 'translateX(' + (-ancho * contador) + 'px)'
    }
    if(carruselItem[contador].id === 'firstClone'){
      carrusel.style.transition = 'none'
      contador = carruselItem.length - contador
      carrusel.style.transform = 'translateX(' + (-ancho * contador) + 'px)'
    }
  })
}

export default carruselNormal
