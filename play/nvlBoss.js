"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var flagSpawnShip = true;
var flagStopSpawn = false;
var shipsSpawned = 0;
var arrayEnemyShips = [];
var shipsKilled=0;
var wave=1;
var displayWave=false;
var flagShootBoss=false;

var ShootsTakenByWave=5;
var countShoots=0;


// ALTERAR AQUI PARA MAIS NAVES
var maxShipsKilled=2;


function loadSprites_NVL_Boss(ctx) {

	NVL_1 = false;
 	NVL_2 = false;
	NVL_3 = false;
	NVL_Boss = true;

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.boss.naturalWidth;
	var nh = imageRepository.boss.naturalHeight;
	var sp = new Ship(200, 0, (3/2)*nw, (3/2)*nh, 3, true, imageRepository.boss, null, null, 1000, "boss");
	spArray[nLoad] = sp;
	nLoad++;

	var nw = imageRepository.boss_life_bar.naturalWidth;
	var nh = imageRepository.boss_life_bar.naturalHeight;
	var life_boss = new BackgroundObject(145, 10, nw, nh, true, imageRepository.boss_life_bar, "boss_life_bar");
	spArray[nLoad] = life_boss;
	nLoad++;

	spawnShips();

	displayWave=true;
	setTimeout(function() {
		displayWave=false;
	}, 2000);
}


function draw_NVL_Boss(ctx, spArray) {

	for (let i=0; i < spArray.length; i++) {

		if (spArray[i].alive == true) {

			spArray[i].draw(ctx);

			if (spArray[i].name == "bom") {
				drawBullets(ctx, spArray[i].bulletsArray);
				moveBullets(ctx, spArray[i].bulletsArray);
			}
		}
		else if (spArray[i].alive == false) {
			console.log("[i] spArray Elements: "+spArray.length);
			spArray.splice(i,1);
			console.log("[f] spArray Elements: "+spArray.length);
		}
	}

	for (let i=arrayEnemyShips.length-1; i>=0; i--) {
		if (arrayEnemyShips[i].alive) {

			arrayEnemyShips[i].draw(ctx);

			if (arrayEnemyShips[i].name == "bossShips") {
				var ship = searchSprite(spArray, "bom");
				arrayEnemyShips[i].moveShip(arrayEnemyShips[i].x, arrayEnemyShips[i].y, ship.x, ship.y);
			}
		}
		else {
			arrayEnemyShips.splice(i,1);
		}
	}

	// desenha naves
	if (flagSpawnShip == true && flagStopSpawn == false && shipsSpawned < maxShipsKilled && flagShootBoss == false) {
		flagSpawnShip = false;
		setTimeout(function() {
			spawnShips();
			flagSpawnShip = true;
		}, 1000);
	}

	displayText(ctx, spArray);

}

function displayText(ctx, spArray) {
	ctx.font = "20px Comic Sans MS"
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(shipsKilled+"/"+maxShipsKilled, ctx.canvas.width-30, ctx.canvas.height-10);

	if (displayWave == true) {
		ctx.font = "40px Comic Sans MS"
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.fillText("Wave "+wave, ctx.canvas.width/2, ctx.canvas.height/2);
	}
}

function spawnShips() {

	// posicao de spawn
	var pos = [215, 545];

	// x random (0 ou 1)
	var randomCor = Math.floor(Math.random()*2);

	var waveShip;
	var ShipEnemyArray = [imageRepository.ship4, imageRepository.ship5, imageRepository.ship6, imageRepository.ship7, imageRepository.ship8]
	if (wave == 1)
		waveShip = ShipEnemyArray[0];
	else if (wave == 2)
		waveShip = ShipEnemyArray[1];
	else if (wave == 3)
		waveShip = ShipEnemyArray[2];
	else if (wave == 4)
		waveShip = ShipEnemyArray[3];
	else if (wave == 5)
		waveShip = ShipEnemyArray[4];

	var nw = waveShip.naturalWidth;
	var nh = waveShip.naturalHeight;

	var sp = new ShipEnemy(pos[randomCor], 120, nw, nh, 0.5, true, waveShip, 1000, "bossShips");

	arrayEnemyShips.push(sp);

	shipsSpawned++;

}


function VerifyCollision_NVL_Boss(ctx, spArray) {

		for (let j=0; j<arrayEnemyShips.length; j++) {

			var enemyShip, ourShip;
			ourShip = searchSprite(spArray, "bom");
			enemyShip = arrayEnemyShips[j];

			if (ourShip.verifyIntersect(enemyShip)) {
				//console.log("tira vida...")
			}

			// interseção das balas com nave "mau"
			// se houver balas e for diferente da nave que disparou
			if (ourShip.bulletsArray.length != 0) {
				for (let k=0; k<ourShip.bulletsArray.length; k++) {
					if (ourShip.bulletsArray[k].verifyIntersect(enemyShip) == true) {

						enemyShip.img = imageRepository.explosion;
						enemyShip.alive = false;

						ourShip.bulletsArray[k].alive = false;

						shipsKilled++;
						if (shipsKilled == maxShipsKilled && wave <= 5) {
							shipsKilled=0;
							shipsSpawned=0;

							maxShipsKilled = wave*2;

							flagShootBoss=true;
						}
					}
				}
			}
		}
		if (flagShootBoss == true || wave >= 6)
			bossColision(ctx, spArray);
	}


function bossColision(ctx, spArray) {
	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].name == "boss") {

			var ourShip = searchSprite(spArray, "bom");
			var boss = spArray[i];

			if (ourShip.bulletsArray.length != 0) {
				for (let k=0; k<ourShip.bulletsArray.length; k++) {
					if (ourShip.bulletsArray[k].verifyIntersect(boss) == true) {

						ourShip.bulletsArray[k].alive = false;
						var life_bar = searchSprite(spArray, "boss_life_bar");

						life_bar.width -= 20;
						if (life_bar.width < 0) {
							life_bar.width = 0;
							flagShootBoss = false;
							boss.img = imageRepository.explosion;
							setTimeout(function () {
								boss.alive = false;
							}, 1000);
							flagStopSpawn=true;
						}
						else {
							countShoots += 1;
							if (countShoots > ShootsTakenByWave) {
								countShoots=0;
								flagShootBoss = false;

								if (wave <= 4) {
									wave++;
									displayWave=true;
									setTimeout(function() {
										displayWave=false;
									}, 2000);
								}
							}
						}
					}
				}
			}
		}
	}
}
