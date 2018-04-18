"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function loadSprites_NVL_1(ctx) {

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
	ctx.font = "15px Comic Sans MS"
	ctx.fillStyle = "white";
	ctx.textAlign = "left";
	var str = "Score: " + countMeteroidsPassed;
	ctx.fillText(str, 0+5, 0+15); 		
}

function VerifyCollision_NVL_1(ctx, spArray) {
	for (let i=0; i<spArray.length; i++) {
		// colisoes só para a nave	
		if (spArray[i].getType() == "ship") {
			for (let j=0; j<meteroidArray.length; j++) {
				if (spArray[i].verifyIntersect(meteroidArray[j]) == true) {

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
			}
		}
	}
}