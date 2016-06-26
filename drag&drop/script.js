/*La operación soltar no es normalmente permitida en la mayoría de los elementos de un documento por defecto.
  Por este motivo, para hacer esta operación disponible en nuestro elemento destino, debemos prevenir
  el comportamiento por defecto del navegador para los eventos 'dragenter' & 'dragover'.*/

function iniciarDragAndDrop(){
	var cajas = document.querySelectorAll('div.caja');
	[].forEach.call(cajas, function(caja){
		caja.addEventListener('dragenter', handleDragEnter, false);
		caja.addEventListener('dragleave', handleDragLeave, false);
		caja.addEventListener('dragend', handleDragEnd, false);
		caja.addEventListener('dragover', handleDragOver, false);
		caja.addEventListener('drop', handleDrop, false);
	});
	
	var imagenes = document.querySelectorAll('div.caja img');
	[].forEach.call(imagenes, function(imagen){
		imagen.addEventListener('dragstart', handleDragStart, false);
		imagen.addEventListener('dragend', handleDragEnd, false);
	});
}

function handleDragStart(e){
	//console.info("dragging... (id: " + e.target.id + ")");
	var idElementDragging = e.target.id;
	var elementDragging = this;
	elementDragging.style.opacity = 0.4;
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text', idElementDragging);
}

function handleDragEnter(e){
	e.preventDefault();
	// this / e.target is the current hover target.
	this.classList.add('over');
}
function handleDragLeave(e){
	this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDragOver(e){
	e.preventDefault();
	this.classList.add('over');
	e.dataTransfer.dropEffect = 'move';
	return false;
}

function handleDrop(e){
	//console.info("dropped (id: " + e.target.id + ")");
	e.preventDefault(); //evita acciones por defecto: abrir enlace o actualizar la ventana para mostrar la imagen que fue soltada
	
	var targetID = e.target.id;

	if(e.dataTransfer.getData('text').length){
		var elementDropped = document.getElementById(e.dataTransfer.getData('text'));
		if(elementDropped){
			elementDropped.style.opacity = 1;
			if(elementDropped.parentNode.id != targetID && e.target.className.indexOf('caja') > -1){
				e.target.appendChild(elementDropped);
				//console.info("dropped!");
			}
		}
	}
	
	if(e.dataTransfer.files.length){
		//console.info("Detectados files: " + e.dataTransfer.files.length);
		for(var cont=0, file; file = e.dataTransfer.files[cont]; cont++){
			// Only process image files.
			if(!file.type.match('image.*')) {
		        continue;
			}
			//console.info(file);
			
			var reader = new FileReader();
			//Closure to capture the file information.
			reader.onload = (function(theFile){
				return function(e){
					//Render thumbnail.
					var nuevaImagen = document.createElement('img');
					nuevaImagen.src = e.target.result;
					nuevaImagen.title = escape(theFile.name);
					nuevaImagen.id = "foto" + parseInt(Math.random()*100000);
					nuevaImagen.addEventListener('dragstart', handleDragStart, false);
					nuevaImagen.addEventListener('dragend', handleDragEnd, false);
					document.getElementById(targetID).insertBefore(nuevaImagen, null);
				};
			})(file);
			
			//Read in the image file as a data URL.
			reader.readAsDataURL(file);
		}
	}
	return false;
}

function handleDragEnd(e){
	//console.info("handleDragEnd...");
	var cajas = document.querySelectorAll('div.caja');
	[].forEach.call(cajas, function(caja){
		caja.classList.remove('over');
	});
}

//window.addEventListener("load", iniciarDragAndDrop, false);
$(function(){
	console.info("iniciarDragAndDrop...");
	iniciarDragAndDrop();
});
