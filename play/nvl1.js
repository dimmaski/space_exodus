"use strict";

var flagBoost = false;
var flagDrawSpeedUp = false;
var flagDrawShield = false;
var countBlinks = 0;
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

	if (ship.shield == true) {
		// dar shield
		ship.objShield.draw(ctx);
		ship.objShield.followCoor(ship.x, ship.y);
	}

	ctx.font = "15px retro"
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	var str = "Score: " + countMeteroidsPassed;
	ctx.fillText(str, 0+7, 0+15);

	if (flagDrawSpeedUp == true) {
		ctx.font = "20px retro"
		ctx.fillText("SPEED UP", ctx.canvas.width/2-40, 40);
	} else if (flagDrawShield == true) {
		ctx.font = "20px retro"
		ctx.fillText("SHIELD", ctx.canvas.width/2-40, 40);
	}

	// SPAWN DOS BOOTS (ALTERAR)
	// 2 segundos
	spawnBoostsTime(0, 500, 0, 500, "shield", 2000, 3000);

	spawnBoostsTime(0, 500, 0, 500, "tresoure", 2000, 3000);

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

		for (let i = 0; i<spArray.length; i++) {
			if (spArray[i].name == "life") {
				if (ship.verifyIntersect(spArray[i]) && numLifes < 3) {
					flagBoost = true;
					// dar vida se nao tiver as 3
					numLifes++;

					if (numLifes == 2) {
						ship.objLife.width += ship.objLife.width/3;
					}
					else {
						ship.objLife.width += ship.objLife.width/2;
					}

					setTimeout(function() {
						flagBoost = false;
					}, 3000);
				}
			}
			else if (spArray[i].name == "shield") {
				if (ship.verifyIntersect(spArray[i])) {
					// ativa shield
					ship.changeShieldState(3000);
					flagBoost = true;
					flagDrawShield = true;
					blink(flagDrawShield);

					setTimeout(function() {
						ship.shield = false;
						flagBoost = false;
						flagDrawShield = false;
					}, 3000);
				}
			}
			else if (spArray[i].name == "tresoure") {
				if (ship.verifyIntersect(spArray[i])) {
					flagBoost = true;
					// dar bonus, por exemplo +velocidade
					flagDrawSpeedUp = true;
					spArray[i].img = imageRepository.chestOpen;
					ship.speed += 3;
					blink(flagDrawSpeedUp);

					setTimeout(function() {
						ship.speed -= 3;
						flagBoost = false;
						flagDrawSpeedUp = false;
					}, 3000);
				}
			}
		}
	}
}

function blink(flag) {
	console.log("blink???")
	if (countBlinks == 0) {
		flag = false;
		countBlinks++;
	} else {
		countBlinks=0;
		flag = true;
	}
	if (flag == true) {
		setTimeout(function() {
			blink();
		}, 500);
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
