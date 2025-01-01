//variables
const URL = 'https://pokeapi.co/api/v2/pokemon/'
let pantalla = document.querySelector('div.pantalla')
let bienvenida = document.querySelector('div.bienvenida')
let puntoRojo = document.querySelector('div.punto-rojo')
let informationPokemon = document.createElement('div')
let botonArriba = document.querySelector('div.arriba')
let botonDerecha = document.querySelector('div.derecha')
let botonAbajo = document.querySelector('div.abajo')
let botonIzquierda = document.querySelector('div.izquierda')
informationPokemon.classList.add('container-pokemon')
let index = 0

//creacion de musica
let musicaFondo = new Audio('./music/musica-fondo.wav')
musicaFondo.volume = 0.3
musicaFondo.loop = true

let next = new Audio('./music/next.wav')
next.volume = 0.5
next.loop = false

let on = new Audio('./music/on.wav')
on.volume = 0.5
on.loop = false
// let next = new Howl({
//     src: ["../music/next.ogg"],
//     volume: 0.5,
//     loop: false
// })

// let on = new Howl({
//     src: ["../music/on.wav"],
//     volumne: 0.5,
//     loop: false,
// })

//funciones de utilidad
export function TurnOn(){
    pantalla.style.background = 'whitesmoke'
    bienvenida.style.visibility = 'visible'
    bienvenida.style.opacity = '1'
    puntoRojo.style.display = 'block'
    informationPokemon.style.display = 'block'
    on.play()
    setTimeout(() => {
        musicaFondo.play()
    }, 300)
    botonDerecha.addEventListener('click', nextPokemon)
    botonIzquierda.addEventListener('click', prevPokemon)
}

//funcion para pasar al siguiente pokemon
export function nextPokemon(){
    pantalla.style.backgroundImage = "url('./img/region-kanto.png')"
    pantalla.style.backgroundSize = '100%'
    if(index >= 0 && index <= 151){
        bienvenida.style.display = 'none'
        next.play()
        index += 1
        fetch(URL + index)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
        if(index > 151){
            index = 0
            index += 1
            fetch(URL + index)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
        }
    }
}

//funcion para pasar al anterior pokemon
export function prevPokemon(){
    pantalla.style.backgroundImage = "url('./img/region-kanto.png')"
    pantalla.style.backgroundSize = '100%'
    if(index <= 1){
        bienvenida.style.display = 'none'
        index = 152
        index -= 1
        next.play()
        fetch(URL + index)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
    }else if(index >= 0){
        bienvenida.style.display = 'none'
        index -= 1
        next.play()
        fetch(URL + index)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data))
    }
}

//funcion para mostrar el pokemon
export function mostrarPokemon(pokemon){
    informationPokemon.innerHTML = `
    <img class="title-pokemon" src= "./img/international_logo.png" alt="">
    <div class="info-image-pokemon">
        <div class="info-pokemon">
            <p class="name-pokemon">${pokemon.name}</p>
            <p class="weight-pokemon">${pokemon.weight} LB</p>
            <p class="type-pokemon">${pokemon.types[0].type.name}
        </div>
        <img class="image-pokemon" src="${pokemon.sprites.other.home.front_shiny}" alt="${pokemon.name}">
    </div>
    `
    pantalla.append(informationPokemon)
}

