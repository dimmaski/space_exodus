"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
  var option = -1;  // 5
  var keydownHandler = function(ev) {

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
      switch(option) {

        // falta adicionar links para as páginas

        case 0:

            break;
        case 1:

            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

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
