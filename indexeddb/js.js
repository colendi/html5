var db = null;

function init(){
	addConsole("init...");
	var containerData = document.getElementById("container_data");
	
	var buttonSave = document.getElementById("save");
	buttonSave.addEventListener('click',addObject,false);
	
	var buttonClear = document.getElementById("clear");
	buttonClear.addEventListener('click',clearConsole,false);
	
	var buttonShow = document.getElementById("show");
	buttonShow.addEventListener('click',showObject,false);
	
	var buttonTitle = document.getElementById("btn_title");
	buttonTitle.addEventListener('click',showObjectByTitle,false);
	
	var buttonDelete = document.getElementById("delete");
	buttonDelete.addEventListener('click',deleteObject,false);
	
	var buttonAll = document.getElementById("btn_all");
	buttonAll.addEventListener('click',showAll,false);
	
	window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	
	if(window.indexedDB){
		indexedDB.deleteDatabase("myDB");
		var request = indexedDB.open("myDB", 2);
		
		request.onupgradeneeded = function(){
			//The database did not previously exist, so create object stores and indexes.
			db = request.result;
			
			//Version 2 has nothing, just the store & 1 index
			if(event.oldVersion < 1){
				addConsole("Updating to version 1");
				
				if(!db.objectStoreNames.contains('books')){
					//using a key path
					var store = db.createObjectStore("books", {keyPath: "isbn", autoIncrement: false});
					//using a generator
					//var store = db.createObjectStore("books", {autoIncrement: true});
				}else{
					var store = bd.transaction(["books"], "readwrite").objectStore("books");
				}
				var titleIndex = store.createIndex("by_title", "title", {unique: false});
			}
			
			
			//Version 2 has some Objects
			if(event.oldVersion < 2){
				addConsole("Updating to version 2");
				//bd.transaction("books", "readwrite")
				var store = request.transaction.objectStore("books");
				var authorIndex = store.createIndex("by_author", "author", {unique: false});
				store.transaction.oncomplete = function(event) {
					//Populate with initial data.
					
					//Open a transaction. 1 argument is an array with the 'tables' you are gonna work with. 2 argument is the type of the transaction: readonly or readwrite
					var transaction = db.transaction(["books"], "readwrite");
					
					//you ask the transaction for the object store you said you would be working with ('books')
					var store = transaction.objectStore("books");
					
					//Once we have the store object we can add new data to the IndexedDB. There are two methods: put() and add().
					addConsole("store.put 'Quarry Memories', 'Fred', 1");
					store.put({title: "Quarry Memories", author: "Fred", isbn: 1});
					addConsole("store.put 'Water Buffaloes', 'Fred', 2");
					store.put({title: "Water Buffaloes", author: "Fred", isbn: 2});
					addConsole("store.put 'Bedrock Nights', 'Barney', 3");
					store.put({title: "Bedrock Nights", author: "Barney", isbn: 3});
				}
				
				store.transaction.onerror = function(event) {
					addConsole('onerror 1');
				}
				
				store.transaction.onsuccess = function(event) {
					addConsole('onsuccess 1');
				}
			}
		};
		request.addEventListener('error', handleErrorIndexDB, false);
		
		request.onerror = function(){
			addConsole('onerror 2');
		}
		
		request.onsuccess = function(e){
			addConsole('db loaded!');
			//we can get de db object with de event object or with the request object
			db = e.target.result;
			useDatabase(db);
			//db = request.result;
		};
	}else{
		addConsole("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
	}
}

function handleErrorIndexDB(e){
	addConsole("<b>Error:</b> " + e.target.error.name + ", " + e.target.error.message);
}

function addObject(){
	var isbn = parseInt(document.getElementById('isbn').value);
	var title = document.getElementById('title').value;
	var author = document.getElementById('author').value;
	addConsole("Adding Object. ISBN: '" + isbn + "', Title: '" + title + "', Author: " + author);
	
	var store = db.transaction(["books"], "readwrite").objectStore("books");
	var request = store.add({isbn: isbn, title: title, author: author});
	
	request.addEventListener('success', function(){showObjectById(isbn);}, false);
	request.addEventListener('error', handleErrorIndexDB, false);
	
	/*document.getElementById('isbn').value = '';
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';*/
}

function deleteObject(){
	if(parseInt(document.getElementById('isbn').value) > 0){
		var isbn = parseInt(document.getElementById('isbn').value);
		var store = db.transaction(["books"], "readwrite").objectStore("books");
		var request = store.delete(isbn);
		request.addEventListener('success', function(){addConsole("ISBN " + isbn + " was deleted!");}, false);
		request.addEventListener('error', handleErrorIndexDB, false);
	}else{
		addConsole("ISBN '" + isbn + "' is not valid!");
	}
}

function showObject(){
	var key = $("#isbn").val();
	showObjectById(key);
}

function showObjectById(key){
	addConsole("Search Object. ISBN: '" + key + "'");
	var tx = db.transaction("books", "readonly");
	var store = tx.objectStore("books");
	var request = store.get(parseInt(key));
	request.onsuccess = function(e){
		//again we can use request.result or e.target.result
		//var matching = request.result;
		var matching = e.target.result;
		if(matching !== undefined){
			addConsole("Object found! ISBN: '" + key + "'");
			//A match was found.
			report(matching.isbn, matching.title, matching.author);
		}else{
			addConsole("Object was not found. ISBN: '" + key + "'");
			//No match was found.
			report(null);
		}
	};
}

function showObjectByTitle(){
	var title = $("#title").val();
	addConsole("Search Object. Title: '" + title + "'");
	var tx = db.transaction("books", "readonly");
	var store = tx.objectStore("books");
	var index = store.index("by_title");
	var request = index.get(title);
	request.onsuccess = function(){
		var matching = request.result;
		if(matching !== undefined){
			addConsole("Object found!. Title: '" + title + "'");
			//A match was found.
			report(matching.isbn, matching.title, matching.author);
		}else{
			addConsole("Object was not found. Title: '" + title + "'");
			//No match was found.
			report(null);
		}
	};
	
	request.onerror = function(){
		alert(request.error);
	};
	
	tx.onabort = function() {
		report(tx.error);
	};
}

function showAll(){
	var store = db.transaction(['books']).objectStore('books', "readonly");
	store.openCursor().onsuccess = function(event){
		var cursor = event.result || event.target.result;
		if(cursor){
			showObjectById(cursor.key);
			cursor.continue();
		}else{
			addConsole("There are no more elements");
		}
	};
}

function closeDB(){
	if(db != null){
		db.close();
	}
}

function report(isbn, title, author){
	if(isbn != null){
		$("#container_data").html("Book '" + title + "' [" + isbn + "], written by " + author);
	}
}

function addConsole(content){
	if(console){
		console.info(content);
	}
	$("#log").html($("#log").html() + "<code>" + content + "</code>");
}
function clearConsole(){
	$("#log").html('');
}

window.addEventListener("load",init,false);