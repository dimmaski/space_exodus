"use strict";

(function()
{
	window.addEventListener("load", main);
}());


var flag = true;
var numEnemyShips = 8;
var rightLimit=0, leftLimit=0;
var goLeft=false;
var conta=0;

function loadSprites_NVL_3(ctx) {

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
			rightLimit = x+nw;
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
}

function shootFromEnemy(ctx) {

	var enemy = searchSprite(spArray, "dispara");	

	for (let i=0; i<spArray.length; i++) {
			
		if (spArray[i].name == "dispara") {
			shoot(ctx, spArray, bulletsArray, spArray[i], "bullet");
			

		}


	}
}
	


function draw_NVL_3(ctx, spArray) {

	var dim = spArray.length;
	var ship = spArray[2];

	for (let i=0; i<dim; i++) {
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

		if (spArray[i].alive == false) {
			console.log("[i] spArray Elements: "+dim);
			spArray.splice(i,1);
			dim = spArray.length;
			console.log("[f] spArray Elements: "+dim);
		}
	}	
	if (flag == true) {
		setTimeout(function() { eue(ctx); }, 2000);
		flag = false;
	}
}

function eue(ctx) {
	shootFromEnemy(ctx);
	flag = true;
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
							enemyShip.alive = false;
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