"use strict";

var scriptCounter = 0;
var sceneOn = false;

(function()
{
	window.addEventListener("load", main);
}());

function main() {
	var script = ["I will take the crystals back with me . . .", "No you won't, it's known that no one escapes mars . ."];
	var scriptCounter = 0;
	var spArray = [];
	var backgroud, hero, villain, box;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx, backgroud, hero, villain, box, script);
}

function init(ctx, backgroud, hero, villain, box, script) {

	backgroud = new Background(0, 0, 800, 600, 3, true, imageRepositoryScene1.backgroundImg);
  hero      = new BackgroundObject(0, 200, 400, 400, true, imageRepositoryScene1.heroImg, "hero");
  villain   = new BackgroundObject(0, 200, 400, 400, false, imageRepositoryScene1.villainImg, "villain");
	box				= new BackgroundObject(300, 350, 500, 200, true, imageRepositoryScene1.boxImg, "box");

	hero.draw(ctx);
	box.draw(ctx);

	nextScript(ctx, backgroud, hero, villain, box, script);

}


function nextScript(ctx, backgroud, hero, villain, box, script) {


		if (scriptCounter < script.length) {
			/*
			var nextScriptHelper = function(ev)
			{
				if(ev.keyCode == 13) {
					waitingForEnter = false;
					nextScript(ctx, backgroud, hero, villain, box, script);
				}
			}
			canvas.addEventListener("keypress", nextScriptHelper);
			*/

			ctx.font = "20px Verdana"
			ctx.fillStyle = "White";
			ctx.textAlign = "center";

			document.getElementById("canvasText").innerHTML = script[scriptCounter];
		  scriptCounter += 1;

			setTimeout(function(){

				nextScript(ctx, backgroud, hero, villain, box, script);

			 }, 8000);

		} else {
			shutDownScene(ctx);
	}

}

function shutDownScene(ctx) {

	window.addEventListener("keypress", shutDownScene);

	//ctx.font = "40px Verdana"
	//ctx.fillStyle = "Black";
	//ctx.textAlign = "center";
	//ctx.fillText("Continue...", ctx.canvas.width/2, ctx.canvas.height/2);
	//ctx.fillText("[ENTER]", ctx.canvas.width/2, ctx.canvas.height/2+30);



	// Mover para pŕoximo lvl
}
