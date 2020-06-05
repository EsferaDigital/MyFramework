import {createCustomElement} from '../assets/var-basicas'

const createModal = content =>{
  const modalContentEl = createCustomElement('div',{
    id: 'Modal-content',
    class: 'Modal-item'
  }, [content])
  const modalContainerEl = createCustomElement('div',{
    id: 'Modal-container',
    class: 'Modal zoom-in'
  }, [modalContentEl])
  document.body.appendChild(modalContainerEl)
  const removeModal = () => {
    modalContainerEl.classList.replace('zoom-in', 'zoom-out')
    modalContainerEl.addEventListener('animationend', () =>{
      document.body.removeChild(modalContainerEl)
    })
  }
  modalContainerEl.addEventListener('click', e =>{
    if(e.target === modalContainerEl) removeModal()
  })
}

export {createModal}
