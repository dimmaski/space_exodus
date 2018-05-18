"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var arrayEnemyShips=[];
var numEnemyShips = 12;
var flagShot = true;
var flagShotSpeed = 5;

var xlimitIni=1000, xLimitEnd=0;
var goLeft=false;
var conta=0;
var flagAtualiza=true;
var timeBetweenShotsFromEnemy=2000;
var flagNextWave=false;
var maxBulletsRandom=5;
var minBulletsRandom=1;

var currentBulletsNvl2 = 10;
var currentMissileNvl2 = 0;

function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx, 2);
}



function loadSprites_NVL_2(ctx) {

	var nw = imageRepository.laser.naturalWidth;
	var nh = imageRepository.laser.naturalHeight;
	spArray.push(new BackgroundObject(640, 560, nw, nh, true, imageRepository.laser, "current_bullets"));

	var nw = imageRepository.missile.naturalWidth;
	var nh = imageRepository.missile.naturalHeight;
	spArray.push(new BackgroundObject(735, 560, nw, nh, true, imageRepository.missile, "current_bullets"));

	spawnWave(ctx, arrayEnemyShips);

}

function spawnWave(ctx, arrayEnemyShips) {

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var x = 10, y = 10, xIni = 10, yIni = 10, shipsHorizontalLimit = 3;
	var changeRow = false, changeColumn = false;
	var countShips = 0;


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

		if (flagShot == true) {
			flagShot = false;
			setTimeout(function() {
				shootFromEnemy(ctx, arrayEnemyShips);
				flagShot = true;
			}, timeBetweenShotsFromEnemy);
		}
	}
	else {
		// spawn outra wave
		if (flagNextWave == true && numEnemyShips > 4) {

			numEnemyShips-=4;
			timeBetweenShotsFromEnemy-=500;
			flagShotSpeed+=3;

			maxBulletsRandom+=1;
			minBulletsRandom+=2;

			spawnWave(ctx, arrayEnemyShips);
			flagNextWave=false;
		}
		else {
			console.log("nextlevel");
			NVL_WON = true;
		}
	}

	// SPAWN DOS BOOTS (ALTERAR)

	spawnBoostsTime(5, 750, 200, 500, "shield", 3000, 3000, true);

	spawnBoostsTime(5, 750, 200, 500, "life", 3000, 3000, true);

	spawnBoostsTime(5, 750, 200, 500, "tresoure", 1000, 5000, true);

	// draw current bullets
	ctx.font = "20px retro";
	ctx.fillStyle = "White";
	ctx.textAlign = "center";
	ctx.fillText("x"+currentBulletsNvl2, 690, 585);
	ctx.fillText("x"+currentMissileNvl2, 768, 585);

}

function VerifyCollision_NVL_2(ctx, spArray) {

	for (let i = 0; i < arrayEnemyShips.length; i++) {
		let enemyShip = arrayEnemyShips[i];
		if (ship.verifyIntersect(enemyShip)) {
			soundRepository.hitSound.play();
			GAME_OVER = true;
		}

		for (let k = 0; k < ship.bulletsArray.length; k++) {
			if (ship.bulletsArray[k].verifyIntersect(enemyShip)) {
				soundRepository.hitSound.play();
				ship.bulletsArray[k].alive = false;
				enemyShip.img = imageRepository.explosion;

				arrayEnemyShips[i].alive = false;
/*
				setTimeout(function() {
					arrayEnemyShips[i].alive = false;
				}, 25);*/
			}
		}

		for (let k = 0; k < enemyShip.bulletsArray.length; k++) {
			if (enemyShip.bulletsArray[k].verifyIntersect(ship) && ship.shield == false) {
				soundRepository.hitSound.play();
				enemyShip.bulletsArray[k].alive = false;
				updateShipLife(spArray);
			}
		}
	}

	// so pode ter 1 boost de cada vez
	if (flagBoost == false) {
		verifyColision_Boosts(ctx);
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
		shoot(ctx, arrayEnemyShips, bulletsArray, arrayEnemyShips[i], "bullet", flagShotSpeed);
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
			}
			else {
				pool[i].y += pool[i].speed;
			}
		}
		else {
			// retirar do array
			pool.splice(i, 1);
		}
	}
}
