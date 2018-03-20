"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main() {

  var c = document.getElementById("historyCanvas");
  var ctx = c.getContext("2d");


  ctx.strokeStyle = "White";
  ctx.beginPath();

  ctx.arc(230, 410, 300, 0, 2 * Math.PI);
  ctx.arc(205, 430, 400, 0, 2 * Math.PI);
  ctx.arc(100, 300, 50, 0, 2 * Math.PI);
  ctx.stroke();

}
