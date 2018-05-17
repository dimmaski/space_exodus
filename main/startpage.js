"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
  var option = -1;  // 6 - max
	var audio = new Audio('../resources/sounds/navigatemenu.wav');
  var keydownHandler = function(ev) {

		audio.play();

    if (ev.keyCode == 38 || ev.keyCode == 87) {
      if(option == 5) {
        option--;
      }
      else if(option == 0) {
        option = 5;
      }
      else {
        option--;
      }
    }

    else if (ev.keyCode == 40 || ev.keyCode == 83)
      option = ++option % 6;

    else if(ev.keyCode == 13) {
      switch(option) {

        // falta adicionar links para as páginas

        case 0:
						window.removeEventListener("keypress", keydownHandler);
						window.location.href = "../lvl_select/level_select.html";
            break;
        case 1:
						window.removeEventListener("keypress", keydownHandler);
						window.location.href = "../play_multi/play.html";
            break;
        case 2:
						window.removeEventListener("keypress", keydownHandler);

            break;
        case 3:
						window.removeEventListener("keypress", keydownHandler);

            break;
        case 4:
						window.removeEventListener("keypress", keydownHandler);

            break;
        case 5:
						window.removeEventListener("keypress", keydownHandler);

            break;

      }





    }


    switch(option) {
      case 0:
          document.getElementById("sound").style.transform = "scale(1)";
          document.getElementById("play").style.transform = "scale(1.5)";
          document.getElementById("multiplayer").style.transform = "scale(1)";
          break;
      case 1:
          document.getElementById("play").style.transform = "scale(1)";
          document.getElementById("multiplayer").style.transform = "scale(1.5)";
          document.getElementById("controls").style.transform = "scale(1)";
          break;
      case 2:
          document.getElementById("multiplayer").style.transform = "scale(1)";
          document.getElementById("controls").style.transform = "scale(1.5)";
          document.getElementById("credits").style.transform = "scale(1)";
          break;
      case 3:
          document.getElementById("controls").style.transform = "scale(1)";
          document.getElementById("credits").style.transform = "scale(1.5)";
          document.getElementById("exit").style.transform = "scale(1)";
          break;
      case 4:
          document.getElementById("credits").style.transform = "scale(1)";
          document.getElementById("exit").style.transform = "scale(1.5)";
          break;
      case 5:
          document.getElementById("play").style.transform = "scale(1)";
          document.getElementById("sound").style.transform = "scale(1.5)";
          document.getElementById("exit").style.transform = "scale(1)";
          break;

    }


	}

	window.addEventListener("keypress", keydownHandler);

}
