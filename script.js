const screens = document.querySelectorAll('.screen')

const choose_burger_btns = document.querySelectorAll('.choose-burger-btn');

const start_btn = document.getElementById('start-btn');

const timeEl = document.getElementById('time');

const scoreEl = document.getElementById('score');

const message = document.getElementById('message');

const game_container = document.getElementById('game-container');


let seconds = 0
let score = 0
let selected_burger = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_burger_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_burger = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createBurger, 1000)
        startGame()
    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++

}

function createBurger() {
    const burger = document.createElement('div')
    burger.classList.add('burger')
    const { x, y } = getRandomLocation()
    burger.style.top = `${y}px`
    burger.style.left = `${x}px`
    burger.innerHTML = `<img src="${selected_burger.src}" alt="${selected_burger.alt}" style="transform: rotate(${Math.random() *360}deg)" />`

    burger.addEventListener('click', catchBurger)

    game_container.appendChild(burger)

}

function getRandomLocation() {
 const width = window.innerWidth
 const height = window.innerHeight
 const x = Math.random() * (width - 200) + 100
 const y = Math.random() * (height - 200) + 100
 return { x, y }


}

function catchBurger () {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addBurgers()
}

function addBurgers() {
    setTimeout(createBurger, 1000)
    setTimeout(createBurger, 1500)
}

function increaseScore() {
    score++
    if(score > 10) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}