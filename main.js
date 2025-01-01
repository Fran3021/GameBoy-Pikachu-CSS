import { TurnOn } from './js/app.js'

//creacion de variables
let botonA = document.querySelector('div.boton-a')
let botonB = document.querySelector('div.boton-b')

//eventos
botonA.addEventListener('click', () => {
    TurnOn()
}, {once: true})

botonB.addEventListener('click', () => {
    location.reload()
})
