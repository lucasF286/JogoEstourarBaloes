var timerId = null;
function iniciarJogo(){
	var url = window.location.search;

	var dificuldade = url.replace("?", "");

	tempoSegundos = 0;

	if(dificuldade == 1){
		tempoSegundos = 120;
	}
	if(dificuldade == 2){
		tempoSegundos = 60;
	}
	if(dificuldade == 3){
		tempoSegundos = 30;
	}

	document.getElementById("cronometro").innerHTML = tempoSegundos;

	timer(tempoSegundos + 1);

	var quantidadeBaloes = 80;

	criaBaloes(quantidadeBaloes);

	document.getElementById("baloesInteiros").innerHTML = quantidadeBaloes;
	document.getElementById("baloesEstourados").innerHTML = 0;
}

function timer(segundos){
	var segundos = segundos - 1;

	if(segundos == -1){
	alert("Você não conseguiu estourar todos os balões a tempo, você perdeu!");
	clearTimeout(timerId);
	return false;
	}

	timerId = setTimeout("timer("+segundos+")", 1000);

	document.getElementById("cronometro").innerHTML = segundos;
}

function criaBaloes(quantidadeBaloes){
	for( var i = 1; i <= quantidadeBaloes; i++){
	var balao = document.createElement("img");
	balao.src = "imagens/balao_azul_pequeno.png";
	balao.style.margin = "10px";
	balao.id = "b"+ i;
	balao.onclick = function(){ estourar(this); };

	document.getElementById("cenario").appendChild(balao);
	}
}

function estourar(b){
 	var balaoId = b.id;

 	document.getElementById(balaoId).setAttribute("onclick", "");
 	document.getElementById(balaoId).src = "imagens/balao_azul_pequeno_estourado.png";

 	pontuacao(-1);
}

function pontuacao(acao){
	var baloesInteiros = document.getElementById("baloesInteiros").innerHTML;
	var baloesEstourados =  document.getElementById("baloesEstourados").innerHTML;

	baloesInteiros = parseInt(baloesInteiros);
	baloesEstourados = parseInt(baloesEstourados);

	baloesInteiros = baloesInteiros + acao;
	baloesEstourados = baloesEstourados - acao;

	document.getElementById("baloesInteiros").innerHTML = baloesInteiros;
	document.getElementById("baloesEstourados").innerHTML = baloesEstourados;

	if(baloesInteiros == 0){
		pontuacaoFinal(baloesEstourados);
		alert("Parabéns, você venceu !");
		clearTimeout(timerId);
		return false;
	}

	pontuacaoFinal(baloesEstourados);
}

function pontuacaoFinal(be){
	document.getElementById("pontuacaoFinal").innerHTML = be;
}
