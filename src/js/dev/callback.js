import ajax from './libreria-ajax';

const callback = () =>{
  const b = document.getElementById('callBack')
  const c = document.getElementById('myContent')
  const setText = data => {
    c.textContent = data
  }
  const getData = callback => {
    setText('Solicitando autorización')
    setTimeout(() =>{
      callback(true)
    }, 2000)
  }
  const showData = callback => {
    setText('Esperando a mostrar la información')
    setTimeout(() => {
      callback({name: 'Carol'})
    }, 2000)
  }

  b.addEventListener('click', () => {
    getData(authorization => {
      if(authorization){
        showData(user => {
          setText(user.name)
        })
      }
    })
  })

}

const promesa = () =>{
  const b = document.getElementById('Promesa')
  const c = document.getElementById('myContent')
  const setText = data => {
    c.textContent = data
  }
  const getData = () => {
    return new Promise((resolve, reject) =>{
      setText('Solicitando autorización')
      setTimeout(() =>{
        resolve(true)
      }, 2000)
    })
  }

  const showData = () => {
    return new Promise((resolve, reject) =>{
      setText('Esperando a mostrar la información')
      setTimeout(() => {
        resolve({name: 'Malita'})
      }, 2000)
    })
  }

  b.addEventListener('click', () => {
    getData()
    .then(authorization => {
      if(authorization){
        return showData()
      }})
    .then(user => {
      setText(user.name)
    })
  })
}

const asyncAwait = function asyncawait(){
  const b = document.getElementById('asyncAwait')
  const c = document.getElementById('myContent')
  const setText = data => {
    c.textContent = data
  }
  const getData = () => {
    return new Promise((resolve, reject) =>{
      setText('Solicitando autorización')
      setTimeout(() =>{
        resolve(true)
      }, 2000)
    })
  }

  const showData = () => {
    return new Promise((resolve, reject) =>{
      setText('Esperando a mostrar la información')
      setTimeout(() => {
        resolve({name: 'Lilita'})
      }, 2000)
    })
  }

  b.addEventListener('click', async () => {
    let user = null
    // guardamos en una constante el resultado de la funcion getData
    const authorization = await getData()
    if(authorization){
      //Nos entrega solo el valor de showData (lo que entrega el resolve de esta promesa-el objeto-)
      user = await showData()
      console.log(user)
      setText(user.name)
    }
    console.log(user.name) //esto no se ejecuta hasta que no se termine de ejecutar el shoedata de la linea 98
  })
}

const apiMarvel = () =>{
  const b = document.getElementById('btnAjax')
  const showMarvel = async () =>{
    const hash = '86653cc8ef0b2eddb0f5c01e7653fc79'
    const apiKey = '2194a7bbaf0ce4691f390aaa3fdc5e8f'
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apiKey}&hash=${hash}&limit=20&nameStartsWith=iron%20man`
    const r = {method: 'GET', url: url}
    const response = await ajax(r)
    switch(response.status){
      case 200:
        console.log(JSON.parse(response.responseText))
        console.log(response.status)
        draw(JSON.parse(response.responseText).data.results)
        break
      case 400:
        setText('Error de cliente ' + response.status)
        break
      default:
        setText('Error Desconocido ' + response.status)
    }
  }

  const draw = data => {
    const fragment = document.createDocumentFragment()
    data.forEach(comic => {
      const container = document.createElement('div')
      const title = document.createElement('h2')
      const image = document.createElement('img')

      title.textContent = comic.name
      image.src = `${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}`
      container.appendChild(title)
      container.appendChild(image)
      fragment.appendChild(container)
    })
    myContent.appendChild(fragment)
  }

  b.addEventListener('click', e => {showMarvel()})
}

const Fetch = () =>{
  const b = document.getElementById('Fetch')
  const hash = '86653cc8ef0b2eddb0f5c01e7653fc79'
  const apiKey = '2194a7bbaf0ce4691f390aaa3fdc5e8f'
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apiKey}&hash=${hash}&limit=20&nameStartsWith=iron%20man`
  b.addEventListener('click', e => {showMarvel()})
  const showMarvel = async () =>{
    const response = await fetch(url)
    switch(response.status){
      case 200:
        const pepito = await response.json()
        draw(pepito.data.results)
        break
      case 400:
        setText('Error de cliente ' + response.status)
        break
      default:
        setText('Error Desconocido ' + response.status)
    }
    // .catch(error => console.log(error))
  }

  const draw = data => {
    const container = document.createElement('div')
    container.classList.add('Marvelcontent')
    data.forEach(comic => {
      const comicHtml = `
        <div>
          <h2>${comic.name}</h2>
          <img src="${comic.thumbnail.path}/standard_fantastic.${comic.thumbnail.extension}" alt="${comic.name}">
        </div>
      `
      container.insertAdjacentHTML('beforeend', comicHtml)
    })
    myContent.appendChild(container)
  }
}

export {
  callback,
  promesa,
  asyncAwait,
  apiMarvel,
  Fetch
}
