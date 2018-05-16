"use strict";

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
	ctx.fillText(str, 0+7, 0+15);

}

function updateShipLife(spArray) {
	// tira 1 vida
	if (flag_treeLifes == true) {
		// esperar 1 seg até tirar outra vida
		setTimeout(function() {
			flag_twoLifes = true;
		}, 150);

		flag_treeLifes = false;
		// update imagem
		var sp = searchSprite(spArray, "vida");
		sp.resizeToLife2(imageRepository.life2);
	}

	// tira 1 vida
	else if (flag_twoLifes == true) {
		// esperar 1 seg até tirar outra vida
		setTimeout(function() {
			flag_oneLife = true;
		}, 150);

		flag_twoLifes = false;
		// update imagem
		var sp = searchSprite(spArray, "vida");
		sp.resizeToLife1(imageRepository.life1);
	}

	// game over
	if (flag_oneLife == true) {
		GAME_OVER = true;
	}

}

function VerifyCollision_NVL_1(ctx, spArray) {

	for (let j = 0; j < meteroidArray.length; j++) {
		if (ship.verifyIntersect(meteroidArray[j])) {
			updateShipLife(spArray);
		}
	}
}

function pickRandomMeteroid() {
	return imageRepository.AsteroidsImgArray[Math.floor(Math.random()*7)];
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
			setTimeout(function() 	{	var sp = new Meteroid(Math.floor(Math.random() * ctx.canvas.width),
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
