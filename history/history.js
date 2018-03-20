"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main() {

  var c = document.getElementById("historyCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx.stroke();

}
