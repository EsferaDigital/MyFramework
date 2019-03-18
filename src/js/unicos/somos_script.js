;
((d,c,$) => {
  // var header = document.getElementById('mainHeader');
  // var alturaHeader = header.offsetHeight;

  function onePageScroll(e) {
    e.preventDefault()
    var idLink = $(this).attr('href'),
      coordSection = $(idLink).offset().top

    $('html, body').animate({
      //para separarlo un poco del top le puse (coordSection - 60)
      scrollTop: (coordSection - 10)
    }, 1000)
  }

  //ejecutamos la funcion onePageScroll en el eventos click de cada enlace

  $('.ver-Mas').on('click', onePageScroll)

  //Fin onepage scroll

})(document, console.log,jQuery.noConflict());
