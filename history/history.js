"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main() {

  var c = document.getElementById("historyCanvas");
  var ctx = c.getContext("2d");
  var background = new Image();
  background.src = "../resources/background_clean.jpg";

  background.onload = function(){
      ctx.drawImage(background,0,0);
  }




  ctx.beginPath();
  ctx.arc(100, 75, 100, 0, 2 * Math.PI);
  ctx.stroke();

}
