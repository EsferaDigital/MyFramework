const sliderFade = () =>{
  var actual = 0;
  const punto1 = document.getElementById('punto1')
  const punto2 = document.getElementById('punto2')
  const punto3 = document.getElementById('punto3')
  const prev = document.getElementById('Prev')
  const next = document.getElementById('Next')

  function puntos(n){
    var ptn = document.getElementsByClassName('punto')
    for(let i = 0; i < ptn.length; i++){
      if(ptn[i].className.includes('punto-activo')){
        ptn[i].className = ptn[i].className.replace('punto-activo', '')
        break
      }
    }
    ptn[n].className += ' punto-activo'
  }

  function mostrar(n){
    var imagenes = document.getElementsByClassName('Slider-item')
    for(let i = 0; i < imagenes.length; i++){
      if(imagenes[i].className.includes('slider-actual')){
        imagenes[i].className = imagenes[i].className.replace('slider-actual', '')
        break
      }
    }
    actual = n;
    imagenes[n].className += ' slider-actual'
    puntos(n)
  }

  function siguiente(){
    actual ++
    if(actual > 2){
      actual = 0
    }
    mostrar(actual)
  }

  function anterior(){
    actual --
    if(actual < 0){
      actual = 2
    }
    mostrar(actual)
  }


  var play = setInterval(siguiente, 3000)
  const btnPlay = document.getElementById('btnPlay')

  function playpause(){
    if(play == null){
      btnPlay.classList.replace('fa-play', 'fa-pause')
      play = setInterval(siguiente, 3000)
    }else{
      btnPlay.classList.replace('fa-pause', 'fa-play')
      clearInterval(play)
      play = null
    }
  }

  btnPlay.addEventListener('click', () => {
    playpause()
  })

  punto1.addEventListener('click', () => {
    mostrar(0)
  })
  punto2.addEventListener('click', () => {
    mostrar(1)
  })
  punto3.addEventListener('click', () => {
    mostrar(2)
  })

  next.addEventListener('click', () => {
    siguiente()
  })

  prev.addEventListener('click', () => {
    anterior()
  })
}

const sliderNormal = function sliderNormal(){
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

export {
  sliderFade,
  sliderNormal
}
