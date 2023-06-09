const pedra = document.getElementById("pedra");
const papel = document.getElementById("papel");
const tesoura = document.getElementById("tesoura");
const lagarto = document.getElementById("lagarto");
const spock = document.getElementById("spock");

const resultadoTexto = document.getElementById("resultado-texto");
const tabelaHistorico = document.getElementById("tabela-historico")
const porcentagemAcertos = document.getElementById("porcentagem-acertos");

let partidas = 0;
let vitorias = 0;

pedra.addEventListener("click", () => jogar("pedra"));
papel.addEventListener("click", () => jogar("papel"));
tesoura.addEventListener("click", () => jogar("tesoura"));
lagarto.addEventListener("click", () => jogar("lagarto"));
spock.addEventListener("click", () => jogar("spock"));

function jogar(escolhaJogador) {
    const escolhaComputador = jogadaComputador();
    const res = resultado(
        escolhaJogador,
        escolhaComputador
    )

    partidas++;
    if(res === "vitoria"){
        vitorias++;
    }
    resultadoTexto
        .textContent = `Jogador: 
        ${escolhaJogador.toUpperCase()} 
        x Computador: 
        ${escolhaComputador.toUpperCase()} 
        - ${res.toUpperCase()}`
    atualizarPorcentagem()
    atualizarHistorico(
        partidas, 
        escolhaJogador, 
        escolhaComputador, 
        res
    )
}

function jogadaComputador(){
    const opcoes = [
        "pedra", 
        "papel", 
        "tesoura",
        "lagarto",
        "spock",
    ]
    const indice = Math.floor(
        Math.random() * opcoes.length
    )
    return opcoes[indice];
}

function resultado(jogador, computador){
    if(jogador === computador){
        return "empate";
    }
    if(
        (jogador === "pedra" && computador === "tesoura") ||
        (jogador === "pedra" && computador === "lagarto") ||
        (jogador === "tesoura" && computador === "papel") ||
        (jogador === "tesoura" && computador === "lagarto") ||
        (jogador === "papel" && computador === "spock") ||
        (jogador === "papel" && computador === "pedra") ||
        (jogador === "lagarto" && computador === "spock") ||
        (jogador === "lagarto" && computador === "papel") ||
        (jogador === "spock" && computador === "tesoura") ||
        (jogador === "spock" && computador === "pedra")
    ){
        return "vitoria"
    }
    return "derrota"
}

function atualizarPorcentagem() {
    const porcentagem = (vitorias / partidas)*100;
    porcentagemAcertos.textContent = `${porcentagem.toFixed(2)}%`
}

function atualizarHistorico(partida, jogador, computador, resultado) {
    const novaLinha = document.createElement("tr");

    const colunas = [
        partida,
        jogador,
        computador,
        resultado[0].toUpperCase() + resultado.slice(1),
    ];

    for(const coluna of colunas){
        const celula = document.createElement("td");
        celula.textContent = coluna;
        novaLinha.appendChild(celula);
    }

    tabelaHistorico
        .querySelector("tbody")
        .appendChild(novaLinha);
}