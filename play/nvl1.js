"use strict";

var countMeteroidsPassed = 0;
var flagCountMeteroidsPassed = true;
var countMeteroidsPassedSpeed = 0;
var flagCURRENT_METEROIDS = true;
var NUM_METEROIDS = 12;
var CURRENT_METEROIDS = 0;
var meteroidArray = [];


(function()
{
	window.addEventListener("load", main);
}());

function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx, 1);
}

function draw_NVL_1(ctx, spArray)
{

	for (let i = 0; i < spArray.length; i++)
	{
		if (spArray[i].alive) {
			spArray[i].draw(ctx);
		}
		if (!spArray[i].alive) {
			spArray.splice(i,1);
		}
	}

	ctx.font = "15px retro"
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	var str = "Score: " + countMeteroidsPassed;
	ctx.fillText(str, 7, 18);

	// SPAWN DOS BOOTS (ALTERAR)
	// x segundos
	spawnBoostsTime(50, 750, 80, 550, "shield", 3000, 3000, true);
	// x segundos
	spawnBoostsTime(50, 750, 80, 550, "life", 3000, 3000, true);
	// x segundos
	spawnBoostsTime(50, 750, 80, 550, "tresoure", 3000, 3000, true);

}

function VerifyCollision_NVL_1(ctx, spArray) {

	for (let j = 0; j < meteroidArray.length; j++) {
		// se nao tiver shield
		if (ship.verifyIntersect(meteroidArray[j]) && ship.shield == false) {
			soundRepository.hitSound.play();
			updateShipLife(spArray);
		}
	}

	// so pode ter 1 boost de cada vez
	if (flagBoost == false) {
		verifyColision_Boosts(ctx);
	}
}

function drawMeteroids(ctx, meteroidArray) {

	var meteroid = pickRandomMeteroid();
	var nw = meteroid.naturalWidth;
	var nh = meteroid.naturalHeight;

	if(flagCountMeteroidsPassed) {
		flagCountMeteroidsPassed = false;
		setTimeout(function() {
			flagCountMeteroidsPassed = true;
			countMeteroidsPassedSpeed += 0.1;
		}, 5000);
	}

	if (countMeteroidsPassed == 500) {
		NVL_WON = true;
	}

	if (CURRENT_METEROIDS <= NUM_METEROIDS && flagCURRENT_METEROIDS) {
			flagCURRENT_METEROIDS = false;
			setTimeout(function() 	{
					var sp = new Meteroid(Math.floor(Math.random() * ctx.canvas.width),
					-Math.floor(Math.random()*10 + nh), nw, nh, true, meteroid, "meteroid");
					meteroidArray.push(sp);

				}, 500 + CURRENT_METEROIDS * 500);

				setTimeout(function() 	{
					flagCURRENT_METEROIDS = true;
					CURRENT_METEROIDS++;
				}, 500 + CURRENT_METEROIDS * 500);

	}

	for (let i = meteroidArray.length - 1; i >= 0; i--) {

		if (meteroidArray[i].y >= ctx.canvas.height) {

			countMeteroidsPassed++;
			// coloca-o novamente em cima
			do {
				meteroidArray[i].x = Math.floor(Math.random() * 800);
				meteroidArray[i].y = -Math.floor(Math.random()*10 + meteroidArray[i].height);
			} while(overlapedAsteroid(meteroidArray, meteroidArray[i]));


		} else {
			meteroidArray[i].draw(ctx);
			meteroidArray[i].y += 3 + countMeteroidsPassedSpeed;
		}

	}
}

function overlapedAsteroid(asteroidArray, asteroid) {

		var overlaped = false
		for(let ast = 0; ast < asteroidArray.length; ast++) {
			if(asteroidArray[ast] !== asteroid) {
				if(asteroidArray[ast].distanceTo(asteroid) < 50) {
					overlaped = true;
				}
			}
		}
		return overlaped;
}
