"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var spArray = [];
var nLoad=0;

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

var NUM_METEROIDS=8;
var CURRENT_METEROIDS=0;
var meteroidArray=[];

// niveis
var NVL_1 = true;
var NVL_2 = false;
var NVL_3 = false;
var NVL_Boss = false;
var GAME_OVER = false;
var NVL_WON = false
var goToLvl = 2;

// vida
var flag_treeLifes = true;
var flag_twoLifes = false;
var flag_oneLife = false;

// [SCORE]
var countMeteroidsPassed=0;
var flag_RISE = true;


function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx);  //carregar todos os componentes

}

function init(ctx) {

	loadSprites(ctx);
	loadSprites_NVL_1(ctx);
	console.log("OK");

	window.addEventListener("keydown", keydownHandler);
	window.addEventListener("keyup", keyupHandler);

	var ship = searchSprite(spArray, "bom");

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
			// espaço de tempo entre tiros
			if (flag_space == true) {
				flag_space = false;
				shoot(ctx, spArray, bulletsArray, ship, "bullet", 3);
				setTimeout(function(){ flag_space = true; }, 500);
			}
		}
		else if (ev.keyCode == 77) {
			console.log("dispara missil");
			// espaço de tempo entre tiros
			if (flag_missile == true) {
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

	animLoop(ctx, spArray, bulletsArray);
}

function loadSprites(ctx) {
	// carregar sprites

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
	var ship = new Ship(cw/2, ch-ch/6, nw, nh, 4, true, imageRepository.shipDown, life, shield, 1000, "bom");
	spArray[nLoad] = ship;
	nLoad++;

}


//apagar sprites
function clear(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].clear(ctx);
	}
}

//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------
var auxDebug = 0;  //eliminar
function animLoop(ctx, spArray, bulletsArray)
{

	var al = function(time)
	{
		animLoop(ctx, spArray, bulletsArray);
	}
	var reqID = window.requestAnimationFrame(al);

	if (NVL_WON == true) {
		// mudar de nivel
		NVL_WON = false;


		if (goToLvl == 2) {
			NVL_1 = false;
			NVL_2 = false;
			NVL_3 = true;
			NVL_Boss = false;
			console.log("ganhou");

			loadSprites_NVL_3(ctx);
			goToLvl+=2;
/*
			// wait 2 sec..
			setTimeout(function() {
				loadSprites_NVL_3(ctx);
				goToLvl+=2;
			}, 2000);*/
		}/*
		else if (goToLvl == 3) {
			NVL_1 = false;
			NVL_2 = false;
			NVL_3 = true;
			NVL_Boss = false;

			setTimeout(function() {
				loadSprites_NVL_3(ctx);
				goToLvl++;
			}, 2000);
		}*/
		else if (goToLvl == 4) {
			NVL_1 = false;
			NVL_2 = false;
			NVL_3 = false;
			NVL_Boss = true;
			loadSprites_NVL_Boss(ctx);
			goToLvl++;
/*
			setTimeout(function() {
				loadSprites_NVL_Boss(ctx);
				goToLvl++;
			}, 2000);*/
		}
	}

	else if (GAME_OVER == false) {
		render(ctx, spArray, bulletsArray, reqID);
	}
	// game over
	else if (GAME_OVER == true) {
		ctx.font = "40px Comic Sans MS"
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("GAME OVER", ctx.canvas.width/2, ctx.canvas.height/2);

		ctx.font = "20px Comic Sans MS"
		//ctx.fillStyle = "red";
		//ctx.textAlign = "center";
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
	console.log(ev.keyCode);
	// reinicia jogo
	if (ev.keyCode == 13) {
		document.location.reload();
	}
	else if (ev.keyCode == 27) {
		var url = "../main/startpage.html";
		document.location.href = url;
		document.location.reload();
	}
}

function moveShip(ctx, spArray) {
	var sp = spArray[2];
	//console.log(sp);

	if (LEFT) {
		//sp.x -= sp.speed;
		if (sp.x >= 0) {
			sp.changeImg(imageRepository.shipLeft);
			sp.width = imageRepository.shipLeft.naturalWidth;
			sp.height = imageRepository.shipLeft.naturalHeight;
	     	sp.moveLeft();
		}
	}
    if (RIGHT) {
    	//sp.x += sp.speed;
    	if (sp.x + sp.width < ctx.canvas.width) {
    		sp.changeImg(imageRepository.shipRight);
    		sp.width = imageRepository.shipRight.naturalWidth;
			sp.height = imageRepository.shipRight.naturalHeight;
	     	sp.moveRight();
    	}
    }
    if (UP) {
    	//sp.y -= sp.speed;
    	if (sp.y >= 0) {
    		sp.changeImg(imageRepository.shipUp);
    		sp.width = imageRepository.shipUp.naturalWidth;
			sp.height = imageRepository.shipUp.naturalHeight;
	     	sp.moveUp();
    	}
    }
    if (DOWN) {
    	//sp.y += sp.speed;
    	if (sp.y + sp.height < ctx.canvas.height) {
    		sp.changeImg(imageRepository.shipDown);
    		sp.width = imageRepository.shipDown.naturalWidth;
			sp.height = imageRepository.shipDown.naturalHeight;
	     	sp.moveDown();
    	}
    }
}

//resedenho, actualizações, ...
function render(ctx, spArray, bulletsArray, reqID, dt)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	if (NVL_1 == true) {

		// move nave
		moveShip(ctx, spArray);

		VerifyCollision_NVL_1(ctx, spArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_1(ctx, spArray)

		drawMeteroids(ctx, meteroidArray);
	}

	else if (NVL_2 == true) {
		// move nave
		moveShip(ctx, spArray);
		// gere balas
		moveBullets(ctx, bulletsArray);

		//moveMeteroids(ctx, meteroidArray);

		// verifica colisao
		VerifyCollision_NVL_2(ctx, spArray, bulletsArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_2(ctx, spArray);

		drawBullets(ctx, bulletsArray);
	}

	else if (NVL_3 == true) {
		moveShip(ctx, spArray);

		VerifyCollision_NVL_3(ctx, spArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_3(ctx, spArray);
	}
	else if (NVL_Boss == true) {
				// move nave
		moveShip(ctx, spArray);
		// gere balas
		moveBullets(ctx, bulletsArray);

		// verifica colisao
		VerifyCollision_NVL_Boss(ctx, spArray, bulletsArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL_Boss(ctx, spArray);

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
				console.log("retirou...");
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

function shoot(ctx, spArray, bulletsArray, ship, type, speed) {
	var size = SIZE_POOL;

	var getShipX = ship.x;
	var getShipY = ship.y;
	var getShipWidth = ship.width;
	var getShipHeigth = ship.height;
	// array com diferentes bullets

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
