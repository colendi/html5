var inputFiles, loading, metadata, data;
function init(){
	inputFiles = document.getElementById('input-files');
	inputFiles.addEventListener('change',processFile,false);
	
	loading = document.getElementById('loading');
	metadata = document.getElementById('metadata');
	data = document.getElementById('data');
}

function processFile(event){
	var files = event.target.files;
	if(files.length){
		loading.innerHTML = "";
		metadata.innerHTML = "";
		data.innerHTML = "";
	}
	var file = files[0];
	var fr = new FileReader();
	if(file.type.match(/text\/plain/)){
		fr.onload = showFilePlain;
		fr.onloadstart = begin;
		fr.onprogress = state;
		showFileMetadata(file);
		fr.readAsText(file);
		//var blob = file.slice(0,100);
		//fr.readAsText(blob);
		//logFiles.innerHTML = logFiles.innerHTML + "<br/><br/>Blob's size': " + blob.size + " bytes";
	}else if(file.type.match(/image.*/i)){
		fr.onloadend = showFileImage;
		fr.onloadstart = begin;
		fr.onprogress = state;
		showFileMetadata(file);
		fr.readAsDataURL(file);
	}
	//fr.readAsBinaryString(file);
	//fr.readAsDataURL(file);
	//fr.readAsArrayBuffer(file);
}

function showFileMetadata(file){
	metadata.innerHTML = "Name: " + file.name;
	metadata.innerHTML = metadata.innerHTML + "<br/><br/>Size: " + file.size + " bytes";
	metadata.innerHTML = metadata.innerHTML + "<br/><br/>Type: " + file.type;
}

function showFilePlain(event){
	var result = event.target.result;
	data.innerHTML = result;
}

function showFileImage(event){
	var result = event.target.result;
	data.innerHTML = "<img width='450' src='" + result + "' />";
	state(event);
}

function begin(e){
	loading.innerHTML = '<progress value="0" max="100">0%</progress>';
}

function state(e){
	var por = parseInt(e.loaded/e.total*100);
	loading.innerHTML = '<progress value="'+por+'" max="100">' + por + '%</progress>';
}
window.addEventListener('load',init,false);