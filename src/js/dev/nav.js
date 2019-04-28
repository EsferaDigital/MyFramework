const toggleNav = () =>{
  const d = document,
  panel = d.querySelector('.Panel'),
  panelBtn = d.querySelector('.Panel-btn')

  panelBtn.addEventListener('click', e => {
    e.preventDefault()
    panelBtn.classList.toggle('is-active')
    panel.classList.toggle('is-active')
  })
}

const scrollNav = () =>{
  const itemLinks = document.querySelectorAll(".Menu-link")

  itemLinks.forEach(elem => elem.addEventListener('click', navBarClick))

  function navBarClick(e){
    smoothScroll(e);
  }

  function smoothScroll(e){
    e.preventDefault()
    const targetId = e.currentTarget.getAttribute("href")
    const targetPosition = document.querySelector(targetId).offsetTop
    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition - 80
    const duration = 1000
    let start = null

    window.requestAnimationFrame(step)
    function step(timestamp){
      if(!start) start = timestamp
      const progress = timestamp - start
      window.scrollTo(0, easeInOut(progress, startPosition, distance, duration))
      if(progress < duration) window.requestAnimationFrame(step)
    }
  }

  function easeInOut(t,b,c,d){
    t /= d/2
    if(t <1 ) return c/2*t*t + b
    t--
    return -c/2 * (t*(t-2) - 1) + b
  }
}


export {toggleNav, scrollNav};
