var maximo, medio, $medio, reproducir, barra, $barra, progreso, bucle, $tiempoActual, $tiempoTotal;

function iniciar(){
	$medio = $("#medio").get(0);
	reproducir = document.getElementById('reproducir');
	barra = document.getElementById('barra');
	$barra = $("#barra");
	progreso = document.getElementById('progreso');
	$tiempoActual = $("#tiempoActual");
	$tiempoTotal = $("#tiempoTotal");
	maximo = parseInt($barra.width());
	
	reproducir.addEventListener('click', play, false);
	barra.addEventListener('click', goTo, false);
	
	$("#medio").on('play', showInfo);
	
	$tiempoTotal.html(decorateTime($medio.duration));
}

function play(){
	if(!$medio.paused && !$medio.ended) {
		$medio.pause();
		reproducir.innerHTML = 'Reproducir';
		window.clearInterval(bucle);
	}else{
		$medio.play();
		reproducir.innerHTML = 'Pausa';
		bucle = setInterval(estado, 500);
	}
}

function estado(){
	$tiempoActual.html(decorateTime($medio.currentTime));
	console.info($medio.buffered.length);
	if(!$medio.ended){
		var total = parseInt($medio.currentTime*maximo/$medio.duration);
		progreso.style.width = total+'px';
	}else{
		progreso.style.width = '0px';
		reproducir.innerHTML = 'Reproducir';
		window.clearInterval(bucle);
	}
}

function goTo(e){
	if(!$medio.paused && !$medio.ended){
		var ratonX = e.pageX-barra.offsetLeft;
		var nuevoTiempo = ratonX*$medio.duration/maximo;
		$medio.currentTime = nuevoTiempo;
		progreso.style.width = ratonX+'px';
	}
}

function decorateTime(time){
	time = parseInt(time);
	minutos = parseInt(time / 60);
	segundos = time % 60;
	if(minutos < 10){minutos = "0" + minutos;}
	if(segundos < 10){segundos = "0" + segundos;}
	return minutos + ":" + segundos;
}

function showInfo(e){
	console.info(e);
}

function obtener_localizacion() {
	  navigator.geolocation.getCurrentPosition(coordenadas);
	}
	function coordenadas(position) {
	  var latitud = position.coords.latitude;
	  var longitud = position.coords.longitude;
	  alert('Tus coordenadas son: ('+latitud+','+longitud+')');
	}
$(function(){
	window.addEventListener('load', iniciar, false);
});