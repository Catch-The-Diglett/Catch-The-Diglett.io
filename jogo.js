/** quantidade de acertos */
var acertos;
acertos = 0;    

/** quantidade de poke perdidas */
var perdidos = 0;

/** quantidade de poke erradas */
var errados = 0;

/** tempo entre cada diglett sair do buraco */
var intervalo = 1000;

/** tempo que o diglett fica fora do buraco */
var janela = 1000;

/** timer que controla o tempo do diglett fora do buraco */
var timer = null;

onload = function () {
    document.getElementById('start').addEventListener('click', start);
    document.getElementById('idGramado').addEventListener('mousedown', pokeBaixo);
    document.getElementById('idGramado').addEventListener('mouseup', pokeCima);
    document.getElementById('buraco0').addEventListener('click', poke);
    document.getElementById('buraco1').addEventListener('click', poke);
    document.getElementById('buraco2').addEventListener('click', poke);
    document.getElementById('buraco3').addEventListener('click', poke);
    document.getElementById('buraco4').addEventListener('click', poke);
    document.getElementById('buraco4').addEventListener('click', poke);
    document.getElementById('buraco5').addEventListener('click', poke);
    document.getElementById('buraco6').addEventListener('click', poke);
    document.getElementById('buraco7').addEventListener('click', poke);
    document.getElementById('buraco8').addEventListener('click', poke);
};

/**
 * Sobe uma toupeira
 * Remove o evento do botão start
 */
function start() {
    var botao = document.getElementById('start')

    botao.removeEventListener('click', start);
    botao.disable = true;
    sobeToupeira();
}

/**
 * Coloca o diglett para fora do buraco.
 * Recalcula o tempo que a toupeira fica fora do buraco.
 * @fires remover a toupeira
 * @fires próximo evento.
 */
function sobeDiglett() {
    var buraco = Math.floor(Math.random() * 9);
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/diglett_sf.png';
    timer = setTimeout(sobeDiglett, janela, buraco);
    setTimeout(sobeDiglett, intervalo);
}

/**
 * Remove a toupeira de um buraco
 * 
 * @param {int} buraco número do buraco onde está a toupeira
 */
function tiraDiglett(buraco) {
    var objBuraco = document.getElementById('buraco' + buraco);
    objBuraco.src = 'images/hole.png';
    perdidos++;
    mostraPontuacao();
}

/**
 * Mostra a pontuação no display de 16 segmentos.
 * A função calcula e exibe o saldo.
 */
function mostraPontuacao() {
    mostraPontuacaoDe('acertos', acertos);
    mostraPontuacaoDe('perdidos', perdidos);
    mostraPontuacaoDe('errados', errados);
    mostraPontuacaoDe('saldo', Math.max(acertos - perdidos - errados, 0));
}

/**
 * Mostra um valor no display.
 * 
 * @param {object image} display imagens com display de 16 segmentos
 * @param {int} valor valor a ser exibido com até 3 dígitos
 */
function mostraPontuacaoDe(display, valor) {
    // pega as imagens
    let objCentena = document.getElementById(display).firstChild;
    let objDezena = objCentena.nextSibling;
    let objUnidade = objDezena.nextSibling;

    // calcula o valor de cada algarismo
    let centena = parseInt(valor/100);
    let dezena = parseInt((valor/10)%10)
    let unidade = (valor % 10)

    // muda a imagem e o valor do atributo para ledor de tela
    objCentena.src = 'images/caractere_' + centena + '.gif';
    objCentena.alt = centena;
    objDezena.src = 'images/caractere_' + dezena + '.gif';
    objDezena.alt = dezena;
    objUnidade.src = 'images/caractere_' + unidade + '.gif';
    objUnidade.alt = unidade;
}

/**
 * Coloca o martelo para baixo.
 */
function pokeBaixo() {
    document.getElementById('idGramado').style.cursor = 'url(images/pokebola_aberta_cursor.png), default';
}

/**
 * Coloca o martelo para cima.
 */
function pokeCima() {
    document.getElementById('idGramado').style.cursor = 'url(images/pokebola_cursor.png), default';
}

/**
 * Trata o evento de uma martelada, ou seja, um click do mouse sobre o gramado.
 * Ao final da martelada, exibe a pontuação atualizada.
 * 
 * @listens event:click
 * @param {event} evento 
 */
function poke(evento) {
    if (evento.target.src.includes('images/diglett_sf.png')) {
        // acertou
        acertos++;
        evento.target.src = 'images/hole.png';
        clearTimeout(timer);
    }
    else {
        // errou
        errados++;
    }
    mostraPontuacao();
}
