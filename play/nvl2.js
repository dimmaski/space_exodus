"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var arrayEnemyShips=[];
var flag = true;
var numEnemyShips = 8;
var xlimitIni=1000, xLimitEnd=0;
var goLeft=false;
var conta=0;
var flagAtualiza=true;
var timeBetweenShotsFromEnemy=2000;
var flagNextWave=false;
<<<<<<< HEAD
=======

function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx, 2);
}


>>>>>>> 5b32f2347cac4cfa773a8f5b19334b87e9b12f8b

function loadSprites_NVL_2(ctx) {

	spawnWave(ctx, arrayEnemyShips);

}

function spawnWave(ctx, arrayEnemyShips) {
<<<<<<< HEAD
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var x=10, y=10, xIni=10, yIni=10, shipsHorizontalLimit=3;
	var changeRow=false, changeColumn=false;
	var countShips=0;
=======

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var x = 10, y = 10, xIni = 10, yIni = 10, shipsHorizontalLimit = 3;
	var changeRow = false, changeColumn = false;
	var countShips = 0;
>>>>>>> 5b32f2347cac4cfa773a8f5b19334b87e9b12f8b


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
		arrayEnemyShips.push(sp);
		countShips++;
	}
}


function draw_NVL_2(ctx, spArray) {
	var ship = searchSprite(spArray, "bom");

	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].alive == true) {

			if (spArray[i].name == "bom") {
				drawBullets(ctx, spArray[i].bulletsArray);
				moveBullets(ctx, spArray[i].bulletsArray);
			}
			spArray[i].draw(ctx);
		}
<<<<<<< HEAD


		else if (spArray[i].alive == false) {
			console.log("[i] spArray Elements: "+dim);
			spArray.splice(i,1);
			console.log("[f] spArray Elements: "+dim);
		}
	}

	if (flagNextWave == false) {
		for (let i=arrayEnemyShips.length-1; i>=0; i--) {
			if (arrayEnemyShips[i].alive == true) {
				moveEnemyShips(ctx, arrayEnemyShips[i]);
				moveBulletsEnemy(ctx, arrayEnemyShips[i].bulletsArray);
				drawBullets(ctx, arrayEnemyShips[i].bulletsArray);
				arrayEnemyShips[i].draw(ctx);
=======


		else if (spArray[i].alive == false) {
			spArray.splice(i,1);
		}
	}

	if (flagNextWave == false) {
		for (let i=arrayEnemyShips.length-1; i>=0; i--) {
			if (arrayEnemyShips[i].alive == true) {
				moveEnemyShips(ctx, arrayEnemyShips[i]);
				moveBulletsEnemy(ctx, arrayEnemyShips[i].bulletsArray);
				drawBullets(ctx, arrayEnemyShips[i].bulletsArray);
				arrayEnemyShips[i].draw(ctx);
			}
			else {
				if (arrayEnemyShips.length <= 1)
					flagNextWave=true;
				arrayEnemyShips.splice(i,1);
			}
		}

		if (flag == true) {
			setTimeout(function() {
				shootFromEnemy(ctx, arrayEnemyShips);
				flag = true;
			}, timeBetweenShotsFromEnemy);

			flag = false;
		}
	}
	else {
		// spawn outra wave
		if (flagNextWave == true && numEnemyShips > 4) {
			numEnemyShips-=4;
			timeBetweenShotsFromEnemy-=500;
			spawnWave(ctx, arrayEnemyShips);
			flagNextWave=false;
		}
		else {
			console.log("nextlevel");
			NVL_WON = true;
		}
	}
}

function VerifyCollision_NVL_2(ctx, spArray) {

	for (let i = 0; i < arrayEnemyShips.length; i++) {
		let enemyShip = arrayEnemyShips[i];
		if (ship.verifyIntersect(enemyShip)) {
			GAME_OVER = true;
		}

		for (let k = 0; k < ship.bulletsArray.length; k++) {
			if (ship.bulletsArray[k].verifyIntersect(enemyShip)) {

				ship.bulletsArray[k].alive = false;
				enemyShip.img = imageRepository.explosion;

				setTimeout(function() {
					arrayEnemyShips[i].alive = false;
				}, 25);
>>>>>>> 5b32f2347cac4cfa773a8f5b19334b87e9b12f8b
			}
			else {
				if (arrayEnemyShips.length <= 1)
					flagNextWave=true;
				arrayEnemyShips.splice(i,1);
			}
		}

		if (flag == true) {
			setTimeout(function() {
				shootFromEnemy(ctx, arrayEnemyShips);
				flag = true;
			}, timeBetweenShotsFromEnemy);

			flag = false;
		}
	}
	else {
		// spawn outra wave
		if (flagNextWave == true && numEnemyShips > 4) {
			numEnemyShips-=4;
			timeBetweenShotsFromEnemy-=500;
			spawnWave(ctx, arrayEnemyShips);
			flagNextWave=false;
		}
<<<<<<< HEAD
		else {
			console.log("nextlevel");
			NVL_WON = true;
=======

		for (let k = 0; k < enemyShip.bulletsArray.length; k++) {
			if (enemyShip.bulletsArray[k].verifyIntersect(ship)) {

				enemyShip.bulletsArray[k].alive = false;
				updateShipLife(spArray);
			}
>>>>>>> 5b32f2347cac4cfa773a8f5b19334b87e9b12f8b
		}

	}

}

function moveEnemyShips(ctx, ship) {

<<<<<<< HEAD
function VerifyCollision_NVL_2(ctx, spArray) {
	for (let i=0; i<arrayEnemyShips.length; i++) {
			var enemyShip = arrayEnemyShips[i];
			var ourShip = searchSprite(spArray, "bom");

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

						setTimeout(function() {
							arrayEnemyShips[i].alive = false;
						}, 25);
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

						updateShipLife(spArray);
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


function shootFromEnemy(ctx, arrayEnemyShips) {

	var enemy = searchSprite(arrayEnemyShips, "dispara");

	for (let i=0; i<arrayEnemyShips.length; i++) {
		shoot(ctx, arrayEnemyShips, bulletsArray, arrayEnemyShips[i], "bullet", 5);
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
=======
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


function shootFromEnemy(ctx, arrayEnemyShips) {

	var enemy = searchSprite(arrayEnemyShips, "dispara");

	for (let i=0; i<arrayEnemyShips.length; i++) {
		shoot(ctx, arrayEnemyShips, bulletsArray, arrayEnemyShips[i], "bullet", 5);
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
>>>>>>> 5b32f2347cac4cfa773a8f5b19334b87e9b12f8b
		else {
			// retirar do array
			pool.splice(i, 1);
			countBullets--;
		}
	}
}
