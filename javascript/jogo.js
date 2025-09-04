var acertos = 0;
var perdidos = 0;
var errados = 0;
var intervalo = 1000;
var janela = 1000;
var timerDiglett = null;
var jogoAtivo = false;
var tempoRestante = 120;
var timerJogo = null;

onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', pokeBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', pokeCima);
    for (let i = 0; i < 9; i++) {
        document.getElementById('buraco' + i).addEventListener('click', poke);
    }
    mostraTempo(tempoRestante); 
};

function start() {
    var botao = document.getElementById('start');
    botao.removeEventListener('click', start);
    botao.disabled = true;

    acertos = 0;
    perdidos = 0;
    errados = 0;
    intervalo = 1000;
    janela = 1000;
    tempoRestante = 120;
    jogoAtivo = true;

    mostraPontuacao();
    mostraTempo(tempoRestante);
    sobeDiglett();
    timerJogo = setInterval(atualizaTimer, 1000);
}

function atualizaTimer() {
    tempoRestante--;
    mostraTempo(tempoRestante);

    if (tempoRestante <= 0) {
        fimDeJogo();
    }
}

function fimDeJogo() {
    jogoAtivo = false;
    clearInterval(timerJogo);
    clearTimeout(timerDiglett);

    alert("Fim de Jogo! Pontuação final: " + (acertos - perdidos - errados));

    var botao = document.getElementById('start');
    botao.addEventListener('click', start);
    botao.disabled = false;
}

function sobeDiglett() {
    if (!jogoAtivo) {
        return;
    }

    if (acertos > 0 && acertos % 10 === 0) {
        if (intervalo > 500) {
            intervalo -= 25;
        }
        if (janela > 500) {
            janela -= 30;
        }
    }

    var buraco = Math.floor(Math.random() * 9);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/diglett_sf.png';
    objBuraco.classList.add('diglett'); // Adiciona uma classe para o CSS funcionar

    timerDiglett = setTimeout(tiraDiglett, janela, buraco);
    
    setTimeout(sobeDiglett, intervalo);
}

function tiraDiglett(buraco) {
    if (!jogoAtivo) return;
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole.png';
    objBuraco.classList.remove('diglett');
    perdidos++;
    mostraPontuacao();
}

function poke(evento) {
    if (!jogoAtivo) return;

    if (evento.target.src.includes('diglett_sf')) {
        acertos++;
        
        const diglettAcertado = evento.target;
        diglettAcertado.classList.add('hit');
        setTimeout(() => {
            diglettAcertado.classList.remove('hit');
        }, 300);

        diglettAcertado.src = 'images/hole.png';
        diglettAcertado.classList.remove('diglett');
        clearTimeout(timerDiglett);
    } else {
        errados++;
    }
    mostraPontuacao();
}

function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

function mostraPontuacaoDe(display, valor) {
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = objCentena.nextSibling;
    let objUnidade = objDezena.nextSibling;
    let centena = parseInt(valor / 100);
    let dezena = parseInt((valor / 10) % 10);
    let unidade = (valor % 10);
    objCentena.src = 'images/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'images/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'images/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade;
}

function mostraTempo(tempo) {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    const segundosFormatados = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('timer-display').textContent = `0${minutos}:${segundosFormatados}`;
}

function pokeBaixo() {
    if(jogoAtivo) document.getElementById('idGramado').style.cursor =  "url('images/pokebola_aberta_cursor.png') 16 16, auto !important";
}

function pokeCima() {
    document.getElementById('idGramado').style.cursor = "url('images/pokebola_cursor.png') 16 16, auto !important";
}


