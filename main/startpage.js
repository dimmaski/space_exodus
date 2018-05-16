"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main()
{
  var option = -1;  // 6 - max
  var keydownHandler = function(ev) {

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


    switch(option) {
      case 0:
          document.getElementById("sound").style.transform = "scale(1)";
          document.getElementById("play").style.transform = "scale(1.5)";
          document.getElementById("history").style.transform = "scale(1)";
          break;
      case 1:
          document.getElementById("play").style.transform = "scale(1)";
          document.getElementById("history").style.transform = "scale(1.5)";
          document.getElementById("controls").style.transform = "scale(1)";
          break;
      case 2:
          document.getElementById("history").style.transform = "scale(1)";
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
