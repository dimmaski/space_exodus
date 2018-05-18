"use strict";

var scriptCounter = 0;
var scripAuxCounter = 1;
var scriptAux = "";
var nextScriptProt = true;
var interrupt = false;
var counter = 0;
var swapped = 0;

(function()
{
	window.addEventListener("load", main);
}());


function main() {

	var script = [" I did it, I managed to escape Mars and get the crystal back to Jupiter . . .", " It was ours to begin with, the Mars fleet shouldn't have messed with us . . .", " Thank you for helping my getting back home, player! . . .", " SPAAACE EXODUS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"];
	var backgroud, hero, villain, box;
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx, backgroud, hero, villain, box, script);

}

function init(ctx, backgroud, hero, villain, box, script) {

	backgroud = new Background(0, 0, 800, 600, 3, true, imageRepositoryScene1.backgroundImg);
  hero      = new BackgroundObject(0, 200, 500, 500, true, imageRepositoryScene1.heroImg, "hero");
  villain   = new BackgroundObject(0, 200, 550, 500, false, imageRepositoryScene1.villainImg, "villain");

	backgroud.draw(ctx);
	hero.draw(ctx);


	var keydownHandler = function(ev)
	{

		if(nextScriptProt == true && !interrupt) {

			nextScriptProt = false;
			nextScript(ctx, backgroud, hero, villain, box, script, 100, keydownHandler);

		} else if((nextScriptProt == false) && (scripAuxCounter < script[scriptCounter].length)) {

			interrupt = true;
			nextScript(ctx, backgroud, hero, villain, box, script, 3, keydownHandler);

		}

	}

	window.addEventListener("keypress", keydownHandler);

}

function nextScript(ctx, backgroud, hero, villain, box, script, time, keydownHandler) {

		if (scriptCounter < script.length) {

			playScript(script[scriptCounter], time, ctx, hero, villain, backgroud);

		} else {

			window.removeEventListener("keypress", keydownHandler);
			shutDownScene(ctx);

		}

}

function playScript(string, time, ctx, hero, villain, backgroud) {

	if(scripAuxCounter < string.length) {

		if(time == 100 && interrupt == false || time == 3) {

			if(scripAuxCounter % 36 == 0) {

				scriptAux += "<br>";
				scriptAux += string[scripAuxCounter++];
				document.getElementById("canvasText").innerHTML = scriptAux;
				setTimeout(playScript, time, string, time, ctx, hero, villain, backgroud);

			} else {

				scriptAux += string[scripAuxCounter++];
				document.getElementById("canvasText").innerHTML = scriptAux;
				setTimeout(playScript, time, string, time, ctx, hero, villain, backgroud);

			}
		}

	} else {

		scriptAux = "";
		scripAuxCounter = 1;
		nextScriptProt = true;
		scriptCounter += 1;
		interrupt = false;

	}
}



function swapCharacters(ctx, hero, villain, backgroud) {

		ctx.clearRect(0, 0, 800, 600);
		backgroud.draw(ctx);


		if(hero.alive == true) {
			hero.alive = false;
			villain.alive = true;
		} else {
			hero.alive = true;
			villain.alive = false;
		}

		if(hero.alive == true) {
			hero.draw(ctx);
		} else {
			villain.draw(ctx);
		}

}

function shutDownScene(ctx) {

	var shutDownScene = function(ev)
	{
		window.location.href = "../../lvl_select/level_select.html";
	}

	window.addEventListener("keypress", shutDownScene);


}
