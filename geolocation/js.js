var taskID = null;
var marker = null;
var map = null;

function init(){
	//console.info("init...");
	var boton = document.getElementById('getPosition');
	boton.addEventListener('click', getPosition, false);
	
	$("#stop").on('click', function(){
		if(taskID != null){
			navigator.geolocation.clearWatch(taskID);
			$("#log").html('Watch stopped!');
		}
	})
}

function initMap(){
	//console.info("initMap...");
	var myLatLng = {lat: 0, lng: 0};
	
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		scrollwheel: false,
		zoom: 1
	});
}

function updateMap(lat, lng, timestamp){
	//console.info("updateMap...");
	var myLatLng = {lat: lat, lng: lng};
	
	if(map == null){
		initMap();
	}
	
	//Update the marker and set its position.
	if(marker != null){
		marker = null;
	}
	marker = new google.maps.Marker({
		map: map,
		position: myLatLng,
		title: 'Timestamp: ' + timestamp
	});
	map.setZoom(14);
	map.panTo(marker.position);
}

function getPosition(){
	//console.info("getPosition...");
	var geoconfig = {
		enableHighAccuracy: false, //if true: GPS. Look out!!
		timeout: 30000,
		maximumAge: 60000
	};
	//navigator.geolocation.getCurrentPosition(dump, errores, geoconfig);
	taskID = navigator.geolocation.watchPosition(dump, errores, geoconfig);
}

function dump(posicion){
	//console.info("dump...");
	//console.info(posicion);
	var log = document.getElementById('log');
	var datos='';
	datos += 'Lat.: ' + posicion.coords.latitude + '<br/>';
	datos += 'Long.: ' + posicion.coords.longitude + '<br/>';
	datos += 'Accurate: ' + posicion.coords.accuracy + 'mts.<br/>';
	datos += 'Timestamp: ' + posicion.timestamp + '<br/>';
	log.innerHTML = datos;
	
	updateMap(posicion.coords.latitude, posicion.coords.longitude, posicion.timestamp);
}

function errores(error){
	//console.info("errores");
	//console.info(error);
	var log = document.getElementById('log');
	var datos = 'Error: ' + error.code + ' "' + error.message + '" <br/> error.PERMISSION_DENIED: ' + error.PERMISSION_DENIED + ' <br/> error.POSITION_UNAVAILABLE: ' + error.POSITION_UNAVAILABLE + ' <br/> error.TIMEOUT: ' + error.TIMEOUT;
	log.innerHTML = datos;
}

window.addEventListener('load',init,false);
window.addEventListener('load',initMap,false);