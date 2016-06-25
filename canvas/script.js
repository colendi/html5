function iniciarLectorCoordenadas(){
	var $lienzo = document.getElementById("lienzo");
	$lienzo.addEventListener("mousemove", function(event){
		var $x = document.getElementById("coordenada-x");
		var $y = document.getElementById("coordenada-y");
		$x.innerHTML = event.clientX - $lienzo.offsetLeft;
		$y.innerHTML = event.clientY - $lienzo.offsetTop;
	}, false);
}

function iniciarLienzo(){
	var canvas = document.getElementById('lienzo');
	lienzo = canvas.getContext('2d');
	
	/*lienzo.globalAlpha = 0.5;			//transparencia
	lienzo.strokeStyle = "red";			//color de la figura vacía
	lienzo.strokeRect(100,100,120,120);	//rectángulo vacío
	lienzo.fillStyle = "green";			//color de la figura rellena
	lienzo.fillRect(110,110,100,100);	//rectángulo relleno
	lienzo.clearRect(120,120,80,80);	//rectángulo substraído*/
	
	
	/*var gradiente = lienzo.createLinearGradient(0,0,10,100);	//Gradiente desde (0,0) a (10,100). En esa recta tendrá luar el degradado.
	gradiente.addColorStop(0, 'red');	//% de color
	gradiente.addColorStop(1, 'green');	//% de color
	lienzo.fillStyle = gradiente;
	lienzo.fillRect(0,0,500,350);*/
	
	
	/*lienzo.beginPath();
	lienzo.moveTo(100,100);	//mover el lápiz a la posición 100,100
	lienzo.lineTo(200,200);	//línea hasta el punto 200,200
	lienzo.lineTo(100,200);	//línea hasta el punto 100,200
	lienzo.closePath();		//cierra la figura
	lienzo.stroke();		//dibujar vacía
	lienzo.fill();			//dibujar relleno*/
	
	
	/*lienzo.beginPath();
	lienzo.moveTo(100,100);
	lienzo.lineTo(200,200);
	lienzo.lineTo(100,200);
	lienzo.clip();	//no dibuja nada, crea una máscara con la forma del trazado para seleccionar qué será dibujado y qué no. Todo lo que caiga fuera de la máscara no se dibujará en el lienzo.
	lienzo.beginPath();
	for(f=0; f<300; f=f+10){
		lienzo.moveTo(0,f);
		lienzo.lineTo(500,f);
	}
	lienzo.stroke();*/
	
	
	/*lienzo.beginPath();
	var radianesA = Math.PI/180*0;
	var radianesB = Math.PI/180*90;
	//arco con centro en (100,100) y radio 50. Empeiza en 0º y acaba en 90º. 0º es el punto más a la derecha. False: dibuja el arco. True: dibuja lo contrario que dibuja con false. 
	lienzo.arc(100,100,50,radianesA,radianesB, false);	
	lienzo.stroke();*/
	
	
	/*lienzo.beginPath();
	lienzo.moveTo(150,150);
	lienzo.quadraticCurveTo(100,125, 50,200);
	lienzo.moveTo(250,50);
	lienzo.bezierCurveTo(200,125, 300,125, 250,200);
	lienzo.stroke();*/
	
	
	/*lienzo.beginPath();
	lienzo.arc(200,150,50,0,Math.PI*2, false);
	lienzo.stroke();
	
	lienzo.lineWidth=10;
	lienzo.lineCap="round"; //butt (acaba abruptamente sin añadir nada), round (añade media circunferencia al final) y square (añade cuadrado al final)
	lienzo.beginPath();
	lienzo.moveTo(230,150);
	lienzo.arc(200,150,30,0,Math.PI, false);
	lienzo.stroke();
	
	lienzo.lineWidth=5;
	lienzo.lineJoin="miter";	//round (recorta menos), bevel (recorta mucho) y miter (expandiendo las puntas de las líneas en la unión hasta que ambas alcanzan un punto en común)
	lienzo.beginPath();
	lienzo.moveTo(195,135);
	lienzo.lineTo(215,155);
	lienzo.lineTo(195,155);
	lienzo.stroke();*/
	
	
	/*lienzo.font="bold 24px verdana, sans-serif";
	lienzo.textAlign="start";
	//lienzo.strokeText("Mi mensaje", 100,100);	//Texto hueco
	lienzo.fillText("Mi mensaje", 100,100);		//Texto relleno*/
	
	
	/*lienzo.font="bold 20px verdana, sans-serif";
	lienzo.fillText("PRUEBA",50,20);
	lienzo.translate(50,70);
	lienzo.rotate(Math.PI/180*45);
	lienzo.fillText("PRUEBA",0,0);
	lienzo.rotate(-Math.PI/180*45);
	lienzo.translate(0,100);
	lienzo.scale(2,2);
	lienzo.fillText("PRUEBA",0,0);*/
	
	
	/*lienzo.fillStyle="#990000";
	lienzo.fillRect(100,100,300,100);
	lienzo.globalCompositeOperation="darker"; //source-in, source-out, source-atop, lighter, xor, destination-over, destination-in, destination-out, destination-atop, darker, copy
	lienzo.fillStyle="#AAAAFF";
	lienzo.font="bold 80px verdana, sans-serif";
	lienzo.textAlign="center";
	lienzo.textBaseline="middle";
	lienzo.fillText("PRUEBA",250,110);*/
	
	
	/*var imagenBomba = new Image();
	imagenBomba.src="bomba.png";
	//el lienzo solo puede dibujar imágenes que ya están completamente cargadas, necesitamos controlar esta situación escuchando al evento load.
	imagenBomba.addEventListener("load", function(){
		lienzo.drawImage(imagenBomba,20,20,256,256) //Dibujar en posición (20,20) con un tamaño de 256x256 (si no se pone tamaño utilizará el original de la imagen)
	}, false);
	
	var imagenCalabaza = new Image();
	imagenCalabaza.src="calabaza.png";
	lienzo.globalCompositeOperation="darker";
	//el lienzo solo puede dibujar imágenes que ya están completamente cargadas, necesitamos controlar esta situación escuchando al evento load.
	imagenCalabaza.addEventListener("load", function(){
		lienzo.drawImage(imagenCalabaza,150,20)	//Dibujar en posición (150,20)
	}, false);*/
	
	
	window.addEventListener('mousemove', animacion, false);
}

function animacion(e){
	lienzo.clearRect(0,0,300,500);
	var xraton=e.clientX;
	var yraton=e.clientY;
	var xcentro=220;
	var ycentro=150;
	var angulo=Math.atan2(xraton-xcentro,yraton-ycentro);
	var x=xcentro+Math.round(Math.sin(angulo)*10);
	var y=ycentro+Math.round(Math.cos(angulo)*10);
	lienzo.beginPath();
	lienzo.arc(xcentro,ycentro,20,0,Math.PI*2, false);
	lienzo.moveTo(xcentro+70,150);
	lienzo.arc(xcentro+50,150,20,0,Math.PI*2, false);
	lienzo.stroke();
	lienzo.beginPath();
	lienzo.moveTo(x+10,y);
	lienzo.arc(x,y,10,0,Math.PI*2, false);
	lienzo.moveTo(x+60,y);
	lienzo.arc(x+50,y,10,0,Math.PI*2, false);
	lienzo.fill();
}


//window.addEventListener("load", iniciarLienzo, false);
$(function(){
	console.info("iniciarLectorCoordenadas...");
	iniciarLectorCoordenadas();
	console.info("iniciarLienzo...");
	iniciarLienzo();
});
