const addButton = document.querySelector('.add-button')
const closeMessage = document.querySelector('#close')
const message = document.querySelector('#message')

function onOpen(game) {
  const modal = document.querySelector(`#modal-${game}`)
  isOpen = true
  modal.style.display = 'block'
}

const onClose = (game) => {
  const modal = document.querySelector(`#modal-${game}`)
  isOpen = false
  modal.style.display = 'none'
}

closeMessage.addEventListener('click', function () {
  message.style.display = 'none'
})

setTimeout(() => {
  message.style.display = 'none'
  window.navigator.vibrate(500)
}, 5000)
