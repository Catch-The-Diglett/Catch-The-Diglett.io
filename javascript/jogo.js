/*VARIÁVEIS GLOBAIS*/
var acertos = 0; /* quantidade de acertos */
var perdidos = 0; /* quantidade de digletts perdidos */
var errados = 0; /* quantidade de digletts errados */
var intervalo = 1000; /* tempo entre cada diglett sair do buraco */
var janela = 1000; /* tempo que o diglett fica fora do buraco */
var timerDiglett = null; 
var jogoAtivo = false;
var tempoRestante = 60; /* tempo do jogo */
var timerJogo = null;

/* relacionamento em quais ids os digletts vão aparecer */
onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', pokeBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', pokeCima);
    for (let i = 0; i < 9; i++) {
        document.getElementById('buraco' + i).addEventListener('click', poke);
    }
    mostraTempo(tempoRestante); 
};

/* jogo se inicia e remove o evento do botão start */
function start() {
    var botao = document.getElementById('start');
    botao.removeEventListener('click', start);
    botao.disabled = true;

    acertos = 0;
    perdidos = 0;
    errados = 0;
    intervalo = 1000;
    janela = 1000;
    tempoRestante = 60;
    jogoAtivo = true;

    mostraPontuacao();
    mostraTempo(tempoRestante);
    sobeDiglett();
    timerJogo = setInterval(atualizaTimer, 1000);
}

/* configuração do timer e fim do jogo*/
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

/* coloca o diglett para fora do buraco e escalona a dificuldade com base nos acertos*/
function sobeDiglett() {
    if (!jogoAtivo) {
        return;
    }

    if (acertos > 0 && acertos % 5 === 0) {
        if (intervalo > 300) {
            intervalo -= 25;
        }
        if (janela > 300) {
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

/* remove o diglett do buraco */
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

/* mostra a pontuação no display */
function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

/* calcula a pontuação e muda as imagens dos valores no display */
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

/* configuração do tempo */
function mostraTempo(tempo) {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    const segundosFormatados = segundos < 10 ? '0' + segundos : segundos;
    document.getElementById('timer-display').textContent = `0${minutos}:${segundosFormatados}`;
}

/* ao final da cptura exibe a pontuação atualizada */
function pokeBaixo() {
    if(jogoAtivo) document.getElementById('idGramado').style.cursor =  "url('images/pokebola_aberta_cursor.png') 16 16, auto !important";
}

function pokeCima() {
    document.getElementById('idGramado').style.cursor = "url('images/pokebola_cursor.png') 16 16, auto !important";
}





