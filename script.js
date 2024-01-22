const html = document.querySelector('html')
const focusBT = document.querySelector('.app__card-button--foco')
const shortBt = document.querySelector('.app__card-button--curto')
const longBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector('#start-pause')
const musicFocusInput = document.querySelector('#alternar-musica')
const startOrPauseBt = document.querySelector('#start-pause span')
const startOrPauseBtIcon = document.querySelector(".app__card-primary-butto-icon")
const timeOnScreen = document.querySelector('#timer')

const music = new Audio('/sounds/luna-rise-part-one.mp3')
const audioPlay = new Audio('/sounds/play.wav');
const audioPause = new Audio('/sounds/pause.mp3');
const audioTimeFinished = new Audio('./sounds/beep.mp3')

let elapsedTimeInSeconds = 30
let rangeId = null

music.loop = true

musicFocusInput.addEventListener('change', () => {
    if (music.paused) {
        music.play()
    } else {
        music.pause()
    }
})

focusBT.addEventListener('click', () => {
    elapsedTimeInSeconds = 30
    changeContext('foco')
    focusBT.classList.add('active')
})

shortBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 5
    changeContext('descanso-curto')
    shortBt.classList.add('active')
})

longBt.addEventListener('click', () => {
    elapsedTimeInSeconds = 15
    changeContext('descanso-longo')
    longBt.classList.add('active')
})

function changeContext(context) {
    showTime()
    buttons.forEach(function (context) {
        context.classList.remove('active')
    })
    html.setAttribute('data-contexto', context)
    banner.setAttribute('src', `/images/${context}.png`)
    switch (context) {
        case "foco":
            title.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            title.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            title.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
}

const countdown = () => {
    if (elapsedTimeInSeconds <= 0) {
        audioTimeFinished.play()
        alert('Tempo finalizado!')
        const focusActive = html.getAttribute('data-contexto') == 'foco'
        if (focusActive) {
            const evt = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evt)
        }
        reset()
        return
    }
    elapsedTimeInSeconds -= 1
    showTime()
}

startPauseBt.addEventListener('click', startOrPause)

function startOrPause() {
    if (rangeId) {
        audioPause.play()
        reset()
        return
    }
    audioPlay.play()
    rangeId = setInterval(countdown, 1000)
    startOrPauseBt.textContent = "Pausar"
    startOrPauseBtIcon.setAttribute('src', `/images/pause.png`)
}

function reset() {
    clearInterval(rangeId)
    startOrPauseBt.textContent = "Começar"
    startOrPauseBtIcon.setAttribute('src', `/images/play_arrow.png`)
    rangeId = null
}

function showTime() {
    const time = new Date(elapsedTimeInSeconds * 1000)
    const timeFormatted = time.toLocaleTimeString('pt-Br', { minute: '2-digit', second: '2-digit' })
    timeOnScreen.innerHTML = `${timeFormatted}`
}

showTime()