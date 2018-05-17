"use strict";

// GLOBAL
var ship;
var spArray = [];
var nLoad = 0;

var LEFT = false;
var RIGHT = false;
var UP = false;
var DOWN = false;
var SPACE = false;
var flag_space = true;
var flag_missile = true;

// qt de balas
var bulletsArray = [];
var SIZE_POOL = 20;
var countBullets = 0;


var GAME_OVER = false;
var NVL_WON = false

// Controlo de vidas
var numLifes = 3;
var numLifesSetTimeOut = 250;
var lifesFlag = true;



var flagSpawnLife = true;
var flagSpawnShield = true;
var flagSpawnTresoure = true;


function init(ctx, nivel) {

	loadSprites(ctx);

	switch(nivel) {
		case 2:
			loadSprites_NVL_2(ctx);
			break;
		case 3:
			loadSprites_NVL_3(ctx);
			break;
	}


	window.addEventListener("keydown", keydownHandler);
	window.addEventListener("keyup", keyupHandler);

	function keydownHandler(ev) {

		if (ev.keyCode == 37 || ev.keyCode == 65)
			LEFT = true;
		else if (ev.keyCode == 39 || ev.keyCode == 68)
			RIGHT = true;
		else if (ev.keyCode == 38 || ev.keyCode == 87)
			UP = true;
		else if (ev.keyCode == 40 || ev.keyCode == 83)
			DOWN = true;
		else if (ev.keyCode == 32) {
			if (flag_space) {
				flag_space = false;
				shoot(ctx, spArray, bulletsArray, ship, "bullet", 3);
				setTimeout(function(){ flag_space = true; }, 500);
			}
		}
		else if (ev.keyCode == 77) {

			if (flag_missile) {
				flag_missile = false;
				shoot(ctx, spArray, bulletsArray, ship, "missile", 3);
				setTimeout(function(){ flag_missile = true; }, 500);
			}
		}
	}

	function keyupHandler(ev) {
		if (ev.keyCode == 37 || ev.keyCode == 65)
			LEFT = false;
		else if (ev.keyCode == 39 || ev.keyCode == 68)
			RIGHT = false;
		else if (ev.keyCode == 38 || ev.keyCode == 87)
			UP = false;
		else if (ev.keyCode == 40 || ev.keyCode == 83)
			DOWN = false;

		// reset nave
		ship.changeImg(imageRepository.shipDown);
		ship.width = imageRepository.shipDown.naturalWidth;
		ship.height = imageRepository.shipDown.naturalHeight;

	}

	animLoop(ctx, spArray, bulletsArray, nivel);
}

function loadSprites(ctx) {

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.shield.naturalWidth;
	var nh = imageRepository.shield.naturalHeight;
	var shield = new BackgroundObject(200, 100, nw, nh, true, imageRepository.shield, "shield");


	var nw = imageRepository.background.naturalWidth;
	var nh = imageRepository.background.naturalHeight;
	var sp = new Background(0, 0, nw, nh, 3, true, imageRepository.background);
	spArray[nLoad] = sp;
	nLoad++;

	var nw = imageRepository.life3.naturalWidth;
	var nh = imageRepository.life3.naturalHeight;
	var life = new BackgroundObject(8, ch-nh-8, nw, nh, true, imageRepository.life3, "vida");
	spArray[nLoad] = life;
	nLoad++;

	var nw = imageRepository.shipDown.naturalWidth;
	var nh = imageRepository.shipDown.naturalHeight;
	ship = new Ship(cw/2, ch-ch/6, nw, nh, 4, true, imageRepository.shipDown, life, shield, 1000, "bom");
	spArray[nLoad] = ship;
	nLoad++;




}

function clear(ctx, spArray) {
	for (let i = 0; i < spArray.length; i++) {
		spArray[i].clear(ctx);
	}
}

//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------
var auxDebug = 0;  //eliminar
function animLoop(ctx, spArray, bulletsArray, nivel) {

	var al = function(time)
	{
		animLoop(ctx, spArray, bulletsArray, nivel);
	}
	var reqID = window.requestAnimationFrame(al);


	if (!GAME_OVER) {
		render(ctx, spArray, bulletsArray, reqID, nivel);
	}

	else if (GAME_OVER) {

		ctx.font = "20px retro";
		ctx.fillStyle = "White";
		ctx.textAlign = "center";
		ctx.fillText("GAME OVER", ctx.canvas.width/2, ctx.canvas.height/2);
		ctx.fillText("[ENTER] to restart", ctx.canvas.width/2, ctx.canvas.height/2+30);
		ctx.fillText("[ESC] back to menu", ctx.canvas.width/2, ctx.canvas.height/2+60);

		var rr = function(ev)
		{
			restartGame(ev, ctx, spArray);
			window.removeEventListener("keypress", rr);
		}
		window.addEventListener("keypress", rr);
	}
}

function restartGame(ev, ctx, spArray) {

	if (ev.keyCode == 13) {
		document.location.reload();
	}
	else if (ev.keyCode == 27) {
		var url = "../lvl_select/lvl_select.html";
		document.location.href = url;
		document.location.reload();
	}
}

function moveShip(ctx, shipArray) {

	if (LEFT) {
		if (ship.x >= 0) {
			ship.changeImg(imageRepository.shipLeft);
			ship.width = imageRepository.shipLeft.naturalWidth;
			ship.height = imageRepository.shipLeft.naturalHeight;
	    ship.moveLeft();
		}
	}
    if (RIGHT) {
    	if (ship.x + ship.width < ctx.canvas.width) {
    		ship.changeImg(imageRepository.shipRight);
    		ship.width = imageRepository.shipRight.naturalWidth;
			ship.height = imageRepository.shipRight.naturalHeight;
	     	ship.moveRight();
    	}
    }
    if (UP) {
    	if (ship.y >= 0) {
    		ship.changeImg(imageRepository.shipUp);
    		ship.width = imageRepository.shipUp.naturalWidth;
			  ship.height = imageRepository.shipUp.naturalHeight;
	     	ship.moveUp();
    	}
    }
    if (DOWN) {
    	if (ship.y + ship.height < ctx.canvas.height) {
    		ship.changeImg(imageRepository.shipDown);
    		ship.width = imageRepository.shipDown.naturalWidth;
			  ship.height = imageRepository.shipDown.naturalHeight;
	     	ship.moveDown();
    	}
    }
}

function updateShipLife() {

	if (lifesFlag == true && numLifes == 3) {

		numLifes--;
		lifesFlag = false;
		setTimeout(function() {
			lifesFlag = true;
		}, numLifesSetTimeOut);

		ship.objLife.width -= 1/3 * ship.objLife.width;
	}

	else if (lifesFlag == true && numLifes == 2) {

		numLifes--;
		lifesFlag = false;
		setTimeout(function() {
			lifesFlag = true;
		}, numLifesSetTimeOut);

		ship.objLife.width -= 1/2 * ship.objLife.width;
	}

	if (lifesFlag == true && numLifes == 1) {
		numLifes--;
		GAME_OVER = true;
	}
}

function render(ctx, spArray, bulletsArray, reqID, nivel)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	if (nivel == 1) {

		// move nave
		moveShip(ctx, spArray);

		VerifyCollision_NVL_1(ctx, spArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);

		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_1(ctx, spArray);

		drawMeteroids(ctx, meteroidArray);


	}

	else if (nivel == 2) {

		moveShip(ctx, spArray);

		VerifyCollision_NVL_2(ctx, spArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_2(ctx, spArray);
	}

	else if (nivel == 3) {
				// movenave
		moveShip(ctx, spArray);
		// gere balas
		moveBullets(ctx, bulletsArray);

		// verifica colisao
		VerifyCollision_NVL_3(ctx, spArray, bulletsArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_3(ctx, spArray);

		drawBullets(ctx, bulletsArray);
	}
}

function searchSprite(spArray, name) {
	var conta=0;
	var searched;

	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].name == name) {
			searched = spArray[i];
		}
	}
	return searched;
}


function backgroundMoving(ctx, spArray) {
	var sp = spArray[0];

	sp.drawBackground(ctx);
	sp.y += 1;

	if (sp.y >= ctx.canvas.height)
		sp.y = 0;

}

function moveBullets(ctx, bulletsArray) {
	var pool = bulletsArray;
	for (var i = 0; i < pool.length; i++) {
		if (pool[i].y >= 0) {
			if (pool[i].alive == false) {
				// retirar do array
				pool.splice(i, 1);
				countBullets--;

			}
			else {
				pool[i].y -= pool[i].speed;
			}
		}
		else {
			// retirar do array
			pool.splice(i, 1);
			countBullets--;
		}
	}
}

function spawnBoostsTime(xIni, xFim, yIni, yFim, type, time, timeAlive) {
	if (type == "life") {
		if (flagSpawnLife == true) {
			flagSpawnLife = false;
			setTimeout(function() {
				spawnBoosts(xIni, xFim, yIni, yFim, type, timeAlive);
				flagSpawnLife = true;
			}, time);
		}
	}
	else if (type == "shield") {
		if (flagSpawnShield == true) {
			flagSpawnShield = false;
			setTimeout(function() {
				spawnBoosts(xIni, xFim, yIni, yFim, type, timeAlive);
				flagSpawnShield = true;
			}, time);
		}
	}
	else if (type == "tresoure") {
		if (flagSpawnTresoure == true) {
			flagSpawnTresoure = false;
			setTimeout(function() {
				spawnBoosts(xIni, xFim, yIni, yFim, type, timeAlive);
				flagSpawnTresoure = true;
			}, time);
		}
	}
}

function spawnBoosts(xIni, xFim, yIni, yFim, type, timeAlive) {
	if (type == "life") {
		var img = imageRepository.life1;
		var nh = img.life1.naturalHeight;
		var nw = img.life1.naturalWidth;
	}
	else if (type == "shield") {
		var img = imageRepository.shield_star;
		var nh = img.naturalHeight;
		var nw = img.naturalWidth;
	}
	else if (type == "tresoure") {
		var img = imageRepository.chestClose;
		var nh = img.naturalHeight;
		var nw = img.naturalWidth;
	}

	var boost = new Boost(Math.floor((Math.random()*xFim)+xIni), Math.floor((Math.random()*yFim)+yIni), nw, nh, true, img, type);
	spArray.push(boost);

	setTimeout(function() {
		boost.alive = false;
	}, timeAlive);
}

function pickRandomMeteroid() {
	return imageRepository.AsteroidsImgArray[Math.floor(Math.random()*7)];
}

function pickRandomShootSound() {
	return soundRepository.shootSoundArray[Math.floor(Math.random()*2)];
}

function shoot(ctx, spArray, bulletsArray, ship, type, speed) {
	var size = SIZE_POOL;
	var getShipX = ship.x;
	var getShipY = ship.y;
	var getShipWidth = ship.width;
	var getShipHeigth = ship.height;
	// array com diferentes bullets

	pickRandomShootSound().play();

	if (type == "bullet") {
		if (countBullets != size) {
			var colorBullets = [imageRepository.bullet, imageRepository.bullet_blue, imageRepository.bullet_red, imageRepository.bullet_yellow];
			var randomBullet = colorBullets[Math.floor(Math.random()*4)];
			var sp = new Bullet(getShipX+getShipWidth/2, getShipY, randomBullet.naturalWidth, randomBullet.naturalHeight, speed, true, randomBullet);
			ship.bulletsArray.push(sp);
			countBullets++;
		}
	}
	else if (type == "missile") {
		if (countBullets != size) {
			var nw = imageRepository.missile.naturalWidth;
			var nh = imageRepository.missile.naturalHeight;
			var sp = new Bullet(getShipX+getShipWidth/2, getShipY, nw, nh, speed, true, imageRepository.missile, "missile");
			ship.bulletsArray.push(sp);
			countBullets++;
		}
	}
	else if (type == "fireball") {
		var arrayFireballs = [imageRepository.fireball1, imageRepository.fireball2, imageRepository.fireball3];
		var fireball = arrayFireballs[Math.floor(Math.random()*3)];
		var sp = new Bullet(getShipX+getShipWidth/2-24, getShipY+getShipHeigth/(1.5), 3*fireball.naturalWidth, 3*fireball.naturalHeight, speed, true, fireball, "missile");
		ship.bulletsArray.push(sp);
		countBullets++;
	}
}

function drawBullets(ctx, bulletsArray)
{
	var dim = bulletsArray.length;

	if (dim != 0) {
		for (let i = 0; i < dim; i++) {
			bulletsArray[i].draw(ctx);
		}
	}
}

function save() {
  localStorage.setItem('player', JSON.stringify(player));
  localStorage.setItem('score', JSON.stringify(score));
}

function load() {
  player = JSON.parse(localStorage.getItem('player'));
  score = JSON.parse(localStorage.getItem('score'));
}
