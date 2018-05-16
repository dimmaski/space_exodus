"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function loadSprites_NVL_1(ctx) {

	NVL_1 = true;
 	NVL_2 = false;
	NVL_3 = false;

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;
}


//desenhar sprites
function draw_NVL_1(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		// so desenha sprites vivos...
		if (spArray[i].alive == true) {
			spArray[i].draw(ctx);
		}
		if (spArray[i].alive == false) {
			console.log("[i] spArray Elements: "+dim);
			spArray.splice(i,1);
			dim = spArray.length;
			console.log("[f] spArray Elements: "+dim);
		}
	}

	// desenha SCORE
	ctx.font = "15px retro"
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	var str = "Score: " + countMeteroidsPassed;
	ctx.fillText(str, 0+5, 0+15);
}

function updateShipLife(spArray) {
	// tira 1 vida
	if (flag_treeLifes == true) {
		// esperar 1 seg até tirar outra vida
		setTimeout(function() {
			flag_twoLifes = true;
		}, 1000);

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
			}, 1000);

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
	for (let i=0; i<spArray.length; i++) {
		// colisoes só para a nave
		if (spArray[i].getType() == "ship") {
			for (let j=0; j<meteroidArray.length; j++) {
				if (spArray[i].verifyIntersect(meteroidArray[j]) == true) {
					updateShipLife(spArray);
				}
			}
		}
	}
}

function drawMeteroids(ctx, meteroidArray) {

		var nw = imageRepository.meteroid.naturalWidth;
		var nh = imageRepository.meteroid.naturalHeight;

		// SE CHEGAR AOS 100 CURRENT_METEROIDS ACABA ESTE NIVEL
		if (countMeteroidsPassed == 10) {
			NVL_WON = true;
		}


		var time = 500;
		if (CURRENT_METEROIDS <= NUM_METEROIDS) {
			// aumentar meteroids, tempo de spawn...

			if (countMeteroidsPassed <= 25) {

				if (flag_RISE == true) {
					NUM_METEROIDS += 7;
					flag_RISE = false;
				}

			} else if (countMeteroidsPassed <= 50) {

				if (flag_RISE == false) {
					flag_RISE = true;
					NUM_METEROIDS += 7;
				}

			} else if (countMeteroidsPassed <= 75) {

				if (flag_RISE == true) {
					NUM_METEROIDS += 7;
					flag_RISE = false;
				}

			} else {

				if (flag_RISE == false) {
					flag_RISE = true;
					NUM_METEROIDS += 7;
				}

			}

			setTimeout(function() 	{	var sp = new Meteroid(Math.floor(Math.random() * 700 + 100), -Math.floor(Math.random()*10 + imageRepository.meteroid.naturalHeight), nw, nh, true, imageRepository.meteroid, "meteroid");
										meteroidArray.push(sp);
									}, time+CURRENT_METEROIDS*time);

			CURRENT_METEROIDS++;
		}

	for (let i=meteroidArray.length-1; i>=0; i--) {

		if (meteroidArray[i].y >= ctx.canvas.height) {

			// SCORE
			countMeteroidsPassed++;

			// coloca-o novamente em cima
			meteroidArray[i].x = Math.floor(Math.random() * 700 + 100);
			meteroidArray[i].y = -Math.floor(Math.random()*10 + meteroidArray[i].height);

		} else {
			meteroidArray[i].draw(ctx);
			meteroidArray[i].y += 2;
		}

	}
}
