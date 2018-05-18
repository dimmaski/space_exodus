"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
  var option = -1;  // 5
	var audio = new Audio('../resources/sounds/navigatemenu.wav');
	var music = new Audio('../resources/sounds/menu_music.mp3');

	var musicCurrentTime = sessionStorage.getItem("musicCurrentTime");
	music.currentTime = musicCurrentTime;
	music.loop = true;
	music.play();
	console.log(musicCurrentTime)

  var keydownHandler = function(ev) {

		audio.play();
    if (ev.keyCode == 38 || ev.keyCode == 87) {
      if(option == 4) {
        option--;
      }
      else if(option == 0) {
        option = 4;
      }
      else {
        option--;
      }
    }

    else if (ev.keyCode == 40 || ev.keyCode == 83)
      option = ++option % 5;

    else if(ev.keyCode == 13) {
			sessionStorage.setItem("musicCurrentTime", music.currentTime);
			music.pause();

      switch(option) {

        case 0:
						window.removeEventListener("keypress", keydownHandler);
						window.location.href = "../play/cutScenes/cutScene1.html";
            break;
        case 1:
						window.removeEventListener("keypress", keydownHandler);
						window.location.href = "../play/cutScenes/cutScene2.html";
            break;
        case 2:
						window.removeEventListener("keypress", keydownHandler);
						window.location.href = "../play/cutScenes/cutScene3.html";
            break;
        case 3:
						window.removeEventListener("keypress", keydownHandler);
						// falta o som manos
            break;
        case 4:
						window.removeEventListener("keypress", keydownHandler);
						window.location.href = "../main/startpage.html";
            break;

      }

    }

    switch(option) {
      case 0:
					document.getElementById("lvl1").style.transform = "scale(1.5)";
          document.getElementById("lvl2").style.transform = "scale(1)";
					document.getElementById("back").style.transform = "scale(1)";
          break;
      case 1:
					document.getElementById("lvl1").style.transform = "scale(1)";
					document.getElementById("lvl2").style.transform = "scale(1.5)";
					document.getElementById("lvlBoss").style.transform = "scale(1)";
          break;
      case 2:
					document.getElementById("lvl2").style.transform = "scale(1)";
					document.getElementById("lvlBoss").style.transform = "scale(1.5)";
					document.getElementById("soundbutton").style.transform = "scale(1)";
          break;
			case 3:
					document.getElementById("lvlBoss").style.transform = "scale(1)";
					document.getElementById("soundbutton").style.transform = "scale(1.5)";
					document.getElementById("back").style.transform = "scale(1)";
          break;
			case 4:
					document.getElementById("lvl1").style.transform = "scale(1)";
					document.getElementById("soundbutton").style.transform = "scale(1)";
					document.getElementById("back").style.transform = "scale(1.5)";
          break;

    }


	}

	window.addEventListener("keypress", keydownHandler);

}
