
const mySocket = () =>{
  let ws = null
  const btnConnect = document.getElementById('btnConnect')
  const btnDisconnect = document.getElementById('btnDisconnect')
  const btnSend = document.getElementById('btnSend')
  const chat = document.getElementById('chat')

  const setText = data => {
    const msg = `<div>${data}</div>`
    chat.insertAdjacentHTML('beforeend', msg)
  }

  const setMessage = data =>{
    const msg = `<div><span>${data.name}:</span><span>${ data.message}</span></div>`
    chat.insertAdjacentHTML('beforeend', msg)
  }

  btnConnect.addEventListener('click', e =>{
    ws = new WebSocket('ws://demos.kaazing.com/echo')
    ws.onopen = () => setText('Conectado')
    ws.onclose = () => setText('Desconectado')
    ws.onerror = e => setText(e)
    ws.onmessage = e =>{
      const msg = JSON.parse(e.data)
      setMessage(msg)
    }
  })

  btnDisconnect.addEventListener('click', e =>{
    ws.close()
  })

  btnSend.addEventListener('click', e =>{
    const msg = {
      name: txtName.value,
      message: txtMsg.value
    }
    ws.send(JSON.stringify(msg))
  })

}

const appSocket = () =>{
  // ws variable que servira para crear el new WebSocket, no instanciamos websocket de inmediato porque websocket intenta conectarse apenas es instanciado
  // la declaramos de manera global porque la necesitaremos en otros ambitos, por ejemplo, para las ventas
  let ws = null
  //funcion para guardar mensajes en una div ya creada en el dom
  const setSystemMessage = data =>{
    //si quisieramos enviar html dentro de esta div, existe el metodo innerHTML
    systemMessage.textContent = data
  }
  //funcion para logearse
  const login = async () =>{
    //variable que guarda la informacion del usuario necesaria para logearse
    const user = {
      name: usrName.value,
      password: password.value
    }
    //variable que instancia el header para poder enviar informacion adicional con el metodo post con fetch
    const header = new Headers()
    //añadimos el tipo de contenido que vamos a enviar
    header.append('Content-type', 'application/json')
    //creamos la variable options para pasarle ese objeto con los datos necesarios a fetch para que haga la peticion al servidor. Almacenamos aca el metodo, los headers y el cuerpo de nuestra petición que lleva los datos del usuario
    const options = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(user)
    }
    //variable en donde almacenaremos el objeto que recibimos como respuesta mediante fetch
    let data = {}
    // variable en la que gurdamos la url a donde se hace la petición
    const url = '/login'
    // guardamos en response lo que nos devuelva fetch
    // fetch necesita una url a donde hara la petición y un objeto con la petición
    const response = await fetch(url, options)
    // Validamos las respuestas recibidas por fetch
    switch(response.status){
      case 200:
        data = await response.json()
        connectWS(data)
        console.log(data)
        // si vemos la consola en data viene un objeto con dos propiedades: message que trae un ok y token que trae el token para poder acceder a la conexion con websocket
        setSystemMessage('Conectado correctamente')
        break
      case 401:
        setSystemMessage('Usuario o contraseña no válido')
        break
      default:
        setSystemMessage('Estado no esperado: ' + response.status)
    }
  }

  //Capturamos el evento que dispara la función login
  btnLogin.addEventListener('click', e =>{
    e.preventDefault()
    login()
  })

  //funcion para conectarse mediante websocket
  //recibe la data que obtubimos al logearnos
  const connectWS = data =>{
    const url = 'ws://localhost:9999/ws'
    const uname = usrName.value
    const token = data.token
    //websocket se conecta mediante GET siempre y necesitamos enviar nuestro token de validacion para que podamos conectarnos. Para ello se ocupan los parametros que se envian mediante url con el formato ?clave=valor. Si necesitamos enviar varios parametros los separamos con un &
    //La url y los parametros que recibe el websocket depende de como hayamos programado el servidor, en este caso le enviamos la url, el usuario y el token del usuario
    ws = new WebSocket(`${url}?uname=${uname}&token=${token}`)
    //lo que debe hacer cuando se conecte
    ws.onopen = e =>{
      setSystemMessage('Conectado al websocket correctamente')
    }
    //Cuando ocurra un error
    ws.onerror = e =>{
      setSystemMessage(e)
    }
    //cuando reciba un mensaje
    ws.onmessage = e =>{
      // e captura el ws y en .data encontramos la informacion recibida en ese ws
      console.log(e.data)
    }
  }

  //capturamoe el evento click en el boton para enviar mensajes y enviamos el mensaje usando el metodo send de nuestro ws
  btnSendMessage.addEventListener('click', e =>{
    e.preventDefault()
    //(tarea: Validar que el mensaje no esté vacio)
    // Podemos usar distintos websocket para distintas cosas (un chat o un videojuego,etc). En la logica del servidor creado por alexys (al cual no tengo acceso) se creo un solo websocket para distintas cosas, de manera tal que se le pide que indique que tipo de dato es.
    // Creamos una variable para enviar mensajes
    const data = {
      type: 'message',
      message: txtMsg.value
    }
    //No podemos enviar un objeto javascript, por lo que necesitamos pasarlo a texto de tipo json
    //lo enviamos como json con el metodo stringify del objeto JSON de js
    ws.send(JSON.stringify(data))
  })
}

export {mySocket, appSocket}
