// Datos para imprimir en el dom

import {Ano} from '../lib/var-basicas'

const CopyDate = () =>{
  let e = document.getElementById('Year')
  e.innerHTML = Ano
}

// Para usar esta funcion necesitamos una mediaquerie (mq, que guardo en lib/var-basicas), un elemento contenedor del mapa en el DOM (mpC, cuya variable guardo en assets/var-mapa), el iframe del mapa de google (mpG, que guardo en assets/var-mapa) y un elemento que contiene una imagen del mapa con un link al mapa pensado para moviles (mpImg, que guardo en assets/var-mapa)

const Mapa = (mq, mpC, mpG, mpImg) =>{
  if(mq.matches){
    mpC.innerHTML = mpG
  } else{
    mpC.innerHTML = mpImg
  }
}

// Para imprimir modal
const printModal = (bm,createModal,content) =>{
  bm.addEventListener('click', () =>{
    createModal(`${content}`)
  })
}

const printModalClasic = (open,modal,close) =>{
  open.addEventListener('click', () =>{
    modal.classList.toggle('zoomin')
    modal.classList.remove('zoomout')
  })
  close.addEventListener('click', () =>{
    modal.classList.replace('zoomin', 'zoomout')
  })
}


export {
  CopyDate,
  Mapa,
  printModal,
  printModalClasic
}
