$(function(){
	var $reproductor = $("#reproductor");
	var $audio = $("audio", $reproductor), $audioDOM = $("audio", $reproductor)[0];
	var progressJob = null;
	var $currentTime = $(".current", $reproductor);
	var $totalTime = $(".total", $reproductor);
	var $bar = $(".bar", $reproductor);
	var $progress = $(".progress", $bar);
	var $volume = $(".volume-bar", $reproductor);
	var $mute = $(".volume-icon", $reproductor);
	var volume = $audioDOM.volume;
	
	//console.info("audio/mp3: " + $audioDOM.canPlayType("audio/mp3"));
	//console.info("audio/ogg: " + $audioDOM.canPlayType("audio/ogg"));
	
	$audio.loop = true;
	
	$totalTime.html(parseTime($audioDOM.duration));
	$(".index", $volume).css("width", parseInt($audioDOM.volume * $volume.width() * 100) / 100);
	
	$mute.on("click", function(e){
		if($mute.hasClass("mute")){
			$audioDOM.volume = volume;
			$mute.removeClass("mute").addClass("no-mute");
		}else{
			volume = $audioDOM.volume;
			$mute.removeClass("no-mute").addClass("mute");
			$audioDOM.volume = 0;
		}
	});
	
	$audio.on("play", function(e){
		progressJob = setInterval(progress, 200);
	});
	
	$audio.on("pause, ended", function(e){
		window.clearInterval(progressJob);
	});
	
	$volume.on("click", function(e){
		var clikedX = e.pageX - $volume.offset().left;
		$(".index", $volume).css("width", parseInt(clikedX));
		$audioDOM.volume = parseInt(clikedX / $volume.width() * 100) / 100;
	});
	
	$(".play", $reproductor).on("click", function(e){
		var $this = $(this);
		e.preventDefault();
		if(!$audioDOM.paused && !$audioDOM.ended){
			$audioDOM.pause();
			$this.html("Play");
		}else{
			$audioDOM.play();
			$this.html("Pause");
		}
	});
	
	$bar.on("click", function(e){
		var clikedX = e.pageX - $bar.offset().left;
		$audioDOM.currentTime = parseInt($audioDOM.duration*clikedX/$bar.width());
	});
	
	function progress(e){
		if(!$audioDOM.ended && !$audioDOM.paused){
			$currentTime.html(parseTime($audioDOM.currentTime));
			var total = parseInt(parseInt($bar.width()) * $audioDOM.currentTime / $audioDOM.duration);
			$progress.css("width",total);
		}else{
			
		}
	}
	
	function parseTime(time){
		var m = parseInt(time / 60);
		if(m < 10){m = "0" + m}
		
		var s = parseInt(time % 60);
		if(s < 10){s = "0" + s}
		
		return m + ":" + s;
	}
});