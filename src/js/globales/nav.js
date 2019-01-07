const btnMenu = document.getElementById('toggleMenu');
const mainMenu = document.getElementById('mainMenu');

function showHide(){
  if(!mainMenu.classList.contains('show-menu')){
    mainMenu.classList.add('show-menu');
  }else{
    mainMenu.classList.remove('show-menu');
  }
}

function hideMenu(){
  mainMenu.classList.remove('show-menu');
}

document.addEventListener('click', e => {
  if (e.target !== mainMenu && e.target !== btnMenu){
    hideMenu();
  }
});

btnMenu.addEventListener('click', showHide);

function efectos(){
  jQuery('#up').on('click', function(){
    jQuery('html, body').animate({
      scrollTop: 0,
      scrollLeft: 0
    }, 1000)
  })
}

function showUp() {
	var scrollVertical = Jquery(window).scrollTop(),
		scrollHorizontal = jQuery(window).scrollLeft()
	//console.log(scrollVertical, scrollHorizontal)
	//Si scrollVertical es mayor a 700px al id up añadele un fadeIn, sino añadele un fadeOut
	return (scrollVertical > 700) ? jQuery('#up').fadeIn() : jQuery('#up').fadeOut()
}

jQuery(document).ready(efectos)
jQuery(window).on('scroll', showUp)
