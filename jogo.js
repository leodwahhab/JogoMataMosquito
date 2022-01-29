var altura
var largura
var vidas = 1
var tempoJogo = 30

// -- define a dificuldade do jogo com base na escolha do usuário --
function definirDificuldade(){
    var nivel = window.location.search
    nivel = nivel.replace('?','')

    let tempo

    if(nivel === 'normal'){
        tempo = 1500
    }
    else if(nivel === 'dificil'){
        tempo = 1000
    }
    else if(nivel === 'chuck-norris'){
        tempo = 750
    }

    return tempo
}

// -- função pra ajustar o tamanho da tela -- 
function ajustarTamanhoPalcoJogo(){
    alturaTela = window.innerHeight
    larguraTela = window.innerWidth
}

ajustarTamanhoPalcoJogo()

//  -- cria coordenadas aleatórias que serão a posição do mosquito --
function pegarPosicaoMosquito(){
    let posicaoX = Math.floor(Math.random() * larguraTela) - 90
    let posicaoY = Math.floor(Math.random() * alturaTela) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    return posicaoX + ';' + posicaoY
}

// -- sorteia o lado para qual o mosquito estará virado --
function pegarLadoMosquito(){
    const n = Math.floor((Math.random() * 2))

    const lado = n === 0 ? -1 : 1
    
    return lado
}

// -- adiciona o mosquito na tela --
function adicionarMosquito(){

    // caso teha um mosquito na tela, ele será removido
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        
        
        if(vidas < 3){
            document.getElementById('v' + vidas).src = 'img/coracao_vazio.png'
            vidas++
        }
        else{
            window.location.href = 'game_over.html'
        }
    }

    const posicaoMosquito = pegarPosicaoMosquito().split(';')
    const posicaoX = posicaoMosquito[0]
    const posicaoY = posicaoMosquito[1]
    
    const lado = pegarLadoMosquito()
    
    const classeTamanho = Math.floor((Math.random() * 3) + 1)

    const mosquito = document.createElement('img')

    mosquito.src = 'img/mosquito.png'
    mosquito.className = 'mosquito' + classeTamanho
    mosquito.id = 'mosquito'
    mosquito.style.position = 'absolute'
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.transform = 'scaleX(' + lado + ')'
    mosquito.onclick = function(){
        this.remove()
    }
    
    //adicionando o mosquito no body
    document.body.appendChild(mosquito)
}

function iniciarJogo(){
    const nivel = document.getElementById('nivel').value
    if(nivel == ''){
        alert('Selecione um nivel de dificuldade!')
        return false
    }
    
    window.location.href = 'app.html?' + nivel
}
