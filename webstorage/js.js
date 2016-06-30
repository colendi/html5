function init(){
	var buttonSave = document.getElementById("save");
	buttonSave.addEventListener("click", addItem, false);
	var buttonRemove = document.getElementById("remove");
	buttonRemove.addEventListener("click", removeItem, false);
	var buttonClear = document.getElementById("clear");
	buttonClear.addEventListener("click", clearStorage, false);
	window.addEventListener("storage", handleEventStorage, false);
	showStorage('session');
	showStorage('local');
}

function handleEventStorage(){
	showStorage('session');
	showStorage('local');
}

function addItem(){
	var key = document.getElementById("key").value;
	var value = document.getElementById("value").value;
	var session = document.getElementById('session').checked ? 'session' : 'local';
	switch(session){
		case 'session':
			sessionStorage.setItem(key, value);
			showStorage(session);
			break;
		case 'local':
			localStorage.setItem(key, value);
			showStorage(session);
			break;
		default:
			alert("Storage not supported: " + session);
			break;
	}
}

function removeItem(){
	var key = document.getElementById("key").value;
	var session = document.getElementById('session').checked ? 'session' : 'local';
	switch(session){
		case 'session':
			sessionStorage.removeItem(key);
			showStorage(session);
			break;
		case 'local':
			localStorage.removeItem(key);
			showStorage(session);
			break;
		default:
			alert("Storage not supported: " + session);
			break;
	}
}

function clearStorage(){
	var session = document.getElementById('session').checked ? 'session' : 'local';
	switch(session){
		case 'session':
			if(confirm('Clear session storage?')){
				sessionStorage.clear();
				showStorage(session);
			}
			break;
		case 'local':
			if(confirm('Clear local storage?')){
				localStorage.clear();
				showStorage(session);
			}
			break;
		default:
			alert("Storage not supported: " + session);
			break;
	}
}

function showStorage(storage){
	switch(storage){
		case 'session':
			var container_storage = document.getElementById("container_session_storage");
			var content = '<b>Length: ' + sessionStorage.length + '</b>';
			if(sessionStorage.length == 0){
				content += '<br/>Session storage is empty';
			}else{
				content += '<ul>'
				for(var cont = 0; cont < sessionStorage.length; cont++){
					content += '<li>' + sessionStorage.key(cont) + ': ' + sessionStorage.getItem(sessionStorage.key(cont)) + '</li>';
				}
				content += '</ul>'
			}
			container_storage.innerHTML = content;
			break;
		case 'local':
			var container_storage = document.getElementById("container_local_storage");
			var content = '<b>Length: ' + localStorage.length + '</b>';
			if(localStorage.length == 0){
				content += '<br/>Local storage is empty';
			}else{
				content += '<ul>'
				for(var cont = 0; cont < localStorage.length; cont++){
					content += '<li>' + localStorage.key(cont) + ': ' + localStorage.getItem(localStorage.key(cont)) + '</li>';
				}
				content += '</ul>'
			}
			container_storage.innerHTML = content;
			break;
		default:
			alert("Storage not supported: " + session);
			break;
	}
}

window.addEventListener("load",init,false);