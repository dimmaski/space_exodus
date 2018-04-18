"use strict";

(function()
{
	window.addEventListener("load", main);
}());



function loadSprites_NVL_3(ctx) {

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var sp = new ShipEnemy(0, 0, nw, nh, 3, true, imageRepository.shipEnemy, 1000, "mau");
	spArray[nLoad] = sp;
	nLoad++;

}


function draw_NVL_3(ctx, spArray) {

	var dim = spArray.length;
	var ship = spArray[2];

	for (let i=0; i<dim; i++) {
		if (spArray[i].alive == true) {
			if (spArray[i].name == "mau")
				spArray[i].moveShip(spArray[i].x, spArray[i].y, ship.x, ship.y);
			spArray[i].draw(ctx);
		}
	}
}

function VerifyCollision_NVL_3(ctx, spArray) {
	for (let i=0; i<spArray.length; i++) {
		for (let j=i+1; j<spArray.length; j++) {
			if (spArray[i].getType() == "ship") {
					if (spArray[i].verifyIntersect(spArray[j]) == true) {
						GAME_OVER = true;
						console.log("toca")
					}
			}
		}
	}
}