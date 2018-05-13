"use strict";

(function()
{
	window.addEventListener("load", main);
}());


var flag = true;
var numEnemyShips = 8;
var xlimitIni=1000, xLimitEnd=0;
var goLeft=false;
var conta=0;
var flagAtualiza=true;

function loadSprites_NVL_3(ctx) {

	NVL_1 = false;
 	NVL_2 = false;
	NVL_3 = true;

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

/*
	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var sp = new ShipEnemy(0, 0, nw, nh, 3, true, imageRepository.shipEnemy, 1000, "mau");
	spArray[nLoad] = sp;
	nLoad++;*/

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var x=10, y=10, xIni=10, yIni=10, shipsHorizontalLimit=3;
	var changeRow=false, changeColumn=false;
	var countShips=0;


	for (let i=0; i<numEnemyShips; i++) {
		// limite horizontal de naves
		if (countShips > shipsHorizontalLimit) {
			changeColumn = true;
			changeRow = true;
			countShips = 0;
		}

		if (changeRow == false) {
			x += nw+xIni;

		}

		if (changeColumn == true) {
			y += nh+yIni;
			// reset X
			x = 2*xIni+nw;

			changeColumn = false;
			changeRow = false;
		}

		var sp = new ShipEnemy(x, y, nw, nh, 3, true, imageRepository.shipEnemy, 1000, "dispara");
		spArray[nLoad] = sp;
		nLoad++;
		countShips++;


	}
	/*
		var nw = imageRepository.explosion.naturalWidth/2;
		var nh = imageRepository.explosion.naturalHeight/2;
		var sp = new Ship(100, 100, nw, nh, 3, true, imageRepository.explosion, 1000, "njnj");
		spArray[nLoad] = sp;*/
		//nLoad++;
}


function draw_NVL_3(ctx, spArray) {

	var dim = spArray.length;
	var ship = spArray[2];

	//getMaxWidthLeft(ctx, spArray);
				for (let j=0; j<spArray.length; j++) {
					if (spArray[j].name == "dispara")
						moveEnemyShips(ctx, spArray[j]);
				}


	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].alive == true) {

			if (spArray[i].name == "mau") {
				spArray[i].moveShip(spArray[i].x, spArray[i].y, ship.x, ship.y);
				console.log("encontrou");
			}
			else if (spArray[i].name == "bom") {
				drawBullets(ctx, spArray[i].bulletsArray);
				moveBullets(ctx, spArray[i].bulletsArray);
			}
			else if (spArray[i].name == "dispara") {
				drawBullets(ctx, spArray[i].bulletsArray);
				moveBulletsEnemy(ctx, spArray[i].bulletsArray);
			}
			spArray[i].draw(ctx);
		}


		else if (spArray[i].alive == false) {
			console.log("[i] spArray Elements: "+dim);
			spArray.splice(i,1);
			dim = spArray.length;
			console.log("[f] spArray Elements: "+dim);
		}
	}
	if (flag == true) {
		setTimeout(function() { shootFromEnemy(ctx);
								flag = true;		 }, 2000);
		flag = false;
	}
}


function VerifyCollision_NVL_3(ctx, spArray) {
	for (let i=0; i<spArray.length; i++) {
		for (let j=i+1; j<spArray.length; j++) {
			//console.log(spArray[i].name+ " , "+spArray[j].name)
			//console.log(spArray[i].getType()+ " , "+spArray[j].getType())
			//console.log("--------");

			if ((spArray[j].name == "dispara" && spArray[i].name == "bom") || (spArray[i].name == "dispara" && spArray[j].name == "bom")) {
				var enemyShip;
				var ourShip;
				if (spArray[i].name == "dispara")
					enemyShip = spArray[i];
				else
					enemyShip = spArray[j];

				if (spArray[i].name == "bom")
					ourShip = spArray[i];
				else
					ourShip = spArray[j];


				// interseção entre naves
				if (ourShip.verifyIntersect(enemyShip) == true) {
					GAME_OVER = true;
					console.log("toca")
				}

				// interseção das balas com nave "mau"
				// se houver balas e for diferente da nave que disparou
				if (ourShip.bulletsArray.length != 0) {
					for (let k=0; k<ourShip.bulletsArray.length; k++) {
						if (ourShip.bulletsArray[k].verifyIntersect(enemyShip) == true) {
							// "matar" bullet
							ourShip.bulletsArray[k].alive = false;

							enemyShip.img = imageRepository.explosion;
							setTimeout(function() { spArray[j].alive = false;
														}, 50);

							console.log("puummm e pshhhhhhh ourShip");
						}
					}
				}

				// interseção das balas com nave "bom"
				// se houver balas e for diferente da nave que disparou
				if (enemyShip.bulletsArray.length != 0) {
					for (let k=0; k<enemyShip.bulletsArray.length; k++) {
						if (enemyShip.bulletsArray[k].verifyIntersect(ourShip) == true) {
							// "matar" bullet
							enemyShip.bulletsArray[k].alive = false;
							console.log("puummm e pshhhhhhh enemyShip");
						}
					}
				}
			}
		}
	}
}


function moveEnemyShips(ctx, ship) {

	// direita
	if (goLeft==false) {
	// atualiza se lado esquerdo antigo for maior que o atual
		if (xlimitIni < ship.x) {
			xlimitIni = ship.x;
		}

		if (xLimitEnd < (ship.x + ship.width)) {
			xLimitEnd = ship.x + ship.width;
		}

		if (xLimitEnd >= ctx.canvas.width) {
			goLeft = true;
			xlimitIni=1000;
			xLimitEnd=0;
			console.log("STOPPPPPP")
		}
		else
			ship.x = ship.x + 2;
	}

	// esquerda
	else {
		if (xlimitIni > ship.x) {
			xlimitIni = ship.x;
		}

		if (xLimitEnd > (ship.x + ship.width)) {
			xLimitEnd = ship.x + ship.width;
		}
		if (xlimitIni <= 0) {
			goLeft = false;
			console.log("STOPPPPPP2")
		}
		else
			ship.x = ship.x - 2;

			//console.log("xlimitIni: "+xlimitIni);
			//console.log("xLimitEnd: "+xLimitEnd);
	}
}

function getMaxWidthLeft(ctx, spArray) {
	var max=0;

	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].name=="dispara") {
			if (spArray[i].x+spArray[i].width > max) {
				max = spArray[i].x+spArray[i].width;
				console.log(max);
			}
		}
	}
}


function shootFromEnemy(ctx) {

	var enemy = searchSprite(spArray, "dispara");

	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].name == "dispara") {
			shoot(ctx, spArray, bulletsArray, spArray[i], "bullet", 5);

		}

	}
}

function moveBulletsEnemy(ctx, bulletsArray) {
	//console.log("ok");
	var pool = bulletsArray;
	//console.log(pool);
	for (var i = 0; i < pool.length; i++) {
		//console.log(pool[i].y);
		if (pool[i].y <= 600) {
			if (pool[i].alive == false) {
				// retirar do array
				pool.splice(i, 1);
				countBullets--;
				console.log("retirou...");
			}
			else {
				pool[i].y += pool[i].speed;
			}
		}
		else {
			// retirar do array
			pool.splice(i, 1);
			countBullets--;
		}
	}
}
