const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const startBt = document.querySelector('.app__card-primary-button')
const botoes = document.querySelectorAll('.app__card-button')
const stratPauseBt = document.querySelector('#start-pause')
const musicaFocoInpunt = document.querySelector('#alternar-musica')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')
musica.loop = true
const musicaPause = new Audio ('/sons/pause.mp3')
const musicaStart = new Audio('/sons/play.wav')
const musicaFim = new Audio('/sons/beep.mp3')
const iniciarOuPausar = document.querySelector('#start-pause span')
const faviconPause = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')

let intervaloId = null
//

 let tempoDecorridoEmSegundos = 1500
musicaFocoInpunt.addEventListener('change' , () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})


// troca a imagem 
const banner = document.querySelector('.app__image')

// troca a frase
const titulo = document.querySelector('.app__title')

const duracaoFoco = 1500;
const  duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

focoBt.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click' , () =>{
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click' , () => {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto (contexto){
    botoes.forEach(function (contexto){
        mostrarTempo()
        contexto.classList.remove('active')
    })

    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
        break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar á superfice<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`


        default:
            break;
    }
}

const contagemRegressiva = () => {
   if(tempoDecorridoEmSegundos <= 0){
    musicaFim.play()
    
    alert('tempo finalizado')
    zerar()
    return
   }
    tempoDecorridoEmSegundos -= 1
   mostrarTempo()
}
stratPauseBt.addEventListener('click', iniciar)

function iniciar(){
    if(intervaloId){
        musicaPause.play()
        zerar()
        return
    } else {
        musicaStart.play()
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausar.textContent = "Pausar"
    faviconPause.setAttribute('src' , '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausar.textContent = "Começar"
    intervaloId = null
    faviconPause.setAttribute('src' , '/imagens/play_arrow.png')
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br' , {minute: '2-digit', second:'2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()