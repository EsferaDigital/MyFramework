const Masonry = function galeria(){
  const masonryLayout = (containerElem, itemsElemens, columns) => {
    containerElem.classList.add('Masonry-layout',`columns-${columns}`)
    let columnsElements = []
    for(let i = 1; i <= columns; i++){
      let column = document.createElement('div')
      column.classList.add('Masonry-column',`column-${i}`)
      containerElem.appendChild(column)
      columnsElements.push(column)
    }
    for(let m = 0; m < Math.ceil(itemsElemens.length / columns); m++){
      for(let n = 0; n < columns; n++){
        let item = itemsElemens[m * columns + n]
        console.log(itemsElemens)
        columnsElements[n].appendChild(item)
      }
    }
  }

  masonryLayout(document.getElementById('Gallery'), document.querySelectorAll('.Masonry-layout-item'), 4)
}

export default Masonry
