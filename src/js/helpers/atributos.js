// los helpers son funciones que nos ayudan a no hacer tareas absurdas

//Para añadir varios atributos

function setAttributes(elem, attrs){
  for(let key in attrs){
    elem.setAttribute(key, attrs[key])
  }
}

// Recibe el elemento y un objeto clave valor con los atributos y su valor
// setAttributes(elem, {
//   "src": "http://example.com",
//   "height": "100%"
// })

export {setAttributes}


