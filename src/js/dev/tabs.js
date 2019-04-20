const TabsNav = function navTabs(){
  let tabContainer = document.getElementById('TabContainer')
  let tabs = Array.prototype.slice.apply(document.querySelectorAll('.Tabs-item'))
  let panels = Array.prototype.slice.apply(document.querySelectorAll('.Tabs-panels-item')) // Ojo que tabs y panels son un non list no un array, por eso los transformamos en un array

  //Capturamos el click en el tabContainer

  tabContainer.addEventListener('click', e => {
    if(e.target.classList.contains('Tabs-item')){
      // i nos da el indice del elemento en el que se hizo click
      let i = tabs.indexOf(e.target);
      // map recorre un array y le hace lo que queramos a ese array (tab es un parametro que representa a cada elemento -el nombre es arbitrario-) y devuelve un nuevo array
      // Le removemos la clase tab-activo a todos los elementos
      tabs.map(tab => tab.classList.remove('tab-activo'))
      // Le añadimos la clase tab-activo al elemento que recibe el click
      tabs[i].classList.add('tab-activo')
      // Lo mismo con los panels
      panels.map(panel => panel.classList.remove('panel-activo'))
      panels[i].classList.add('panel-activo')
    }
  })
}

export default TabsNav
