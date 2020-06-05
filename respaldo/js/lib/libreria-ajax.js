// Ver curso para saber como usarla

const ajax = request =>{
  return new Promise((resolve, reject) =>{
    const xhr = new XMLHttpRequest()
    xhr.open(request.method, request.url, true)
    xhr.addEventListener('load', e =>{
      resolve(e.target)
    })
    xhr.send()
  })
}

export {
  ajax
}
