// Para las variables que imprimen, contienen o envían un contenido o dato para el DOM

const finalDate = 'November 1 2019 12:00:00 GMT-500'
const mpC = document.getElementById('Mapa')
const mpG = '<div class="Mapa-responsive"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1672.6258460006077!2d-71.5522778804054!3d-33.02349888679817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9689dde1d3a5187b%3A0x359c0e46671a5a18!2sPlaza+Latorre%2C+Vi%C3%B1a+del+Mar%2C+Regi%C3%B3n+de+Valpara%C3%ADso!5e0!3m2!1ses-419!2scl!4v1562272073863!5m2!1ses-419!2scl" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe></div>'
const mpImg = '<a href="https://bit.ly/2Jd1PHS" target="_blank"><span class="Link-mapa">Ver en Google Maps</span><img src="img/mapa.jpg" alt="Mapa"></a>'

//  Para formulario de google embebidos
const Form = `
      <table border=0 cellspacing=0 cellpadding=0 class="scroll-iframe">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeZzWHFwBcZmjrFWi9c_AWyAC3NJ1ySYNepbh93VvzDqOVFwg/viewform?embedded=true" width="640" height="1639" frameborder="0" marginheight="0" marginwidth="0">Cargando…</iframe>
      </table>`

export {
  finalDate,
  mpC,
  mpG,
  mpImg,
  Form
}
