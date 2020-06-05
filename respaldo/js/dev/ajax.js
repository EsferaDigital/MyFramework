const XHR = () => {
  const c = document.getElementById('myContent')
  const b = document.getElementById('btnLoad')
  const bj = document.getElementById('btnLoadJSON')
  const l = document.getElementById('loading')

  l.style.display = 'none';

  b.addEventListener('click', evt =>{
    l.style.display = 'block';
    const xhr = new XMLHttpRequest()
    // Metodo, url, y true para que sea asincrona
    // xhr.open('GET', '/data.html', true)
    xhr.open('GET', '/json', true)

    // Para que haga algo con la respuesta
    // Cuando cargue (load) o reciba la informacion, carguela en el elemento c (la div que creamos)
    xhr.addEventListener('load', e => {
      console.log(e.target)
      // c.innerHTML = e.target.responseText
      l.style.display = 'none';
    })

    //Para que realice la petición
    xhr.send()
  })
}

export {XHR}
