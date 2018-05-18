"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var soundStatus=true;

function main()
{
  var option = -1;  // 6 - max
	var audio = new Audio('../resources/sounds/navigatemenu.wav');
	var music = new Audio('../resources/sounds/menu_music.mp3');



	// se vier de outra página para aqui...
	var musicCurrentTime = sessionStorage.getItem("musicCurrentTime");
	if (musicCurrentTime != null) {
		music.currentTime = musicCurrentTime;
		console.log(musicCurrentTime);
		music.loop = true;
		music.play();
	}

	music.loop = true;
	music.play();


	var mousedownHandler = function(ev) {

		sessionStorage.setItem("musicCurrentTime", music.currentTime);
		console.log(music.currentTime)

		if (option == 0 || option == 1)
			window.removeEventListener("mousedown", mousedownHandler);
	}

	window.addEventListener("mousedown", mousedownHandler);

}
