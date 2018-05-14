"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var spArray = [];
var nLoad=0;

var LEFT_PLAYER1 = false;
var RIGHT_PLAYER1 = false;
var UP_PLAYER1 = false;
var DOWN_PLAYER1 = false;

var LEFT_PLAYER2 = false;
var RIGHT_PLAYER2 = false;
var UP_PLAYER2=false;
var DOWN_PLAYER2=false;

var q = false;
var p = false;


var flag_q = true;
var flag_p=true;

// qt de balas
var bulletsArray = [];
var SIZE_POOL = 20;
var countBullets = 0;


// niveis
var GAME_OVER = false;
var NVL_WON = false;

// vida
var flag_treeLifes_player1 = true;
var flag_twoLifes_player1 = false;
var flag_oneLife_player1 = false;

var flag_threeLifes_player2=true;
var flag_twoLifes_player2=false;
var flag_oneLife_player2=false;


function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx);  //carregar todos os componentes

}

function init(ctx) {

	loadSprites(ctx);
	console.log("OK");


	window.addEventListener("keydown", keydownHandler);
	window.addEventListener("keyup", keyupHandler);

	var ship_player1 = searchSprite(spArray, "player1");
	var ship_player2 = searchSprite(spArray, "player2");

	function keydownHandler(ev) {
		if (ev.keyCode == 37)
			LEFT_PLAYER1 = true;
		else if (ev.keyCode == 39)
			RIGHT_PLAYER1 = true;
		else if (ev.keyCode == 38)
			UP_PLAYER1 = true;
		else if (ev.keyCode == 40)
			DOWN_PLAYER1 = true;
		else if (ev.keyCode == 80) {
			// espaço de tempo entre tiros
			if (flag_p == true) {
				flag_p = false;
				shoot(ctx, spArray, bulletsArray, ship_player1, "bullet", 8);
				setTimeout(function(){ flag_p = true; }, 500);
			}
		}else if (ev.keyCode == 65)
			LEFT_PLAYER2 = true;
		else if (ev.keyCode == 68)
			RIGHT_PLAYER2 = true;
		else if (ev.keyCode == 87)
			UP_PLAYER2 = true;
		else if (ev.keyCode == 83)
			DOWN_PLAYER2 = true;
		else if (ev.keyCode == 81) {
			// espaço de tempo entre tiros
			if (flag_q == true) {
				flag_q = false;
				shoot(ctx, spArray, bulletsArray, ship_player2, "bullet", 8);
				setTimeout(function(){ flag_q = true; }, 500);
			}
		}
	}

	function keyupHandler(ev) {
		if (ev.keyCode == 37 )
			LEFT_PLAYER1 = false;
		else if (ev.keyCode == 39)
			RIGHT_PLAYER1 = false;
		else if (ev.keyCode == 38)
			UP_PLAYER1 = false;
		else if (ev.keyCode == 40)
			DOWN_PLAYER1 = false;
		else if (ev.keyCode == 65)
			LEFT_PLAYER2 = false;
		else if (ev.keyCode == 68)
			RIGHT_PLAYER2= false;
		else if (ev.keyCode == 87)
			UP_PLAYER2 = false;
		else if (ev.keyCode == 83)
			DOWN_PLAYER2 = false;


		// reset nave
		ship_player1.changeImg(imageRepository.shipDown);
		ship_player2.changeImg(imageRepository.ship5);
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
	var life = new BackgroundObject(8, ch/100, nw, nh, true, imageRepository.life3, "vida2");
	spArray[nLoad] = life;
	nLoad++;

	var nw = imageRepository.life3.naturalWidth;
	var nh = imageRepository.life3.naturalHeight;
	var life = new BackgroundObject(8, ch-nh-8, nw, nh, true, imageRepository.life3, "vida1");
	spArray[nLoad] = life;
	nLoad++;

	var nw = imageRepository.shipDown.naturalWidth;
	var nh = imageRepository.shipDown.naturalHeight;
	var ship = new Ship(cw/2, ch-ch/6, nw, nh, 4, true, imageRepository.shipDown, life, shield, 1000, "player1");
	spArray[nLoad] = ship;
	nLoad++;


	var nw = imageRepository.ship5.naturalWidth;
	var nh = imageRepository.ship5.naturalHeight;
	var ship = new Ship(cw/2, ch/10, nw, nh, 4, true, imageRepository.ship5, life, shield, 1000, "player2");
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
		console.log("ganhou");

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
	var sp_1 = searchSprite(spArray,"player1");
	var sp_2 = searchSprite(spArray,"player2");
	//console.log(sp);

	//PLAYER 2

	if (LEFT_PLAYER2) {
		//sp.x -= sp.speed;
		if (sp_2.x >= 0) {
			sp_2.changeImg(imageRepository.shipLeft);
				sp_2.moveLeft();
		}
	}
	if (RIGHT_PLAYER2) {
		//sp.x += sp.speed;
		if (sp_2.x + sp_2.width < ctx.canvas.width) {
			sp_2.changeImg(imageRepository.shipRight);
			sp_2.moveRight();
		}
	}

	if (UP_PLAYER2) {
		//sp.y -= sp.speed;
		if (sp_2.y >= 0) {
			sp_2.changeImg(imageRepository.shipUp);
			sp_2.moveUp();
		}
	}

	if (DOWN_PLAYER2) {
		//sp.y += sp.speed;
		if (sp_2.y + sp_2.height < ctx.canvas.height) {
			sp_2.changeImg(imageRepository.shipDown);
			sp_2.moveDown();
		}
	}

	//PLAYER 1

	if (LEFT_PLAYER1) {
		//sp.x -= sp.speed;
		if (sp_1.x >= 0) {
			sp_1.changeImg(imageRepository.shipLeft);
	     	sp_1.moveLeft();
		}
	}

    if (RIGHT_PLAYER1) {
    	//sp.x += sp.speed;
    	if (sp_1.x + sp_1.width < ctx.canvas.width) {
    		sp_1.changeImg(imageRepository.shipRight);
	     	sp_1.moveRight();
    	}
    }
    if (UP_PLAYER1) {
    	//sp.y -= sp.speed;
    	if (sp_1.y >= 0) {
    		sp_1.changeImg(imageRepository.shipUp);
	     	sp_1.moveUp();
    	}
    }
    if (DOWN_PLAYER1) {
    	//sp.y += sp.speed;
    	if (sp_1.y + sp_1.height < ctx.canvas.height) {
    		sp_1.changeImg(imageRepository.shipDown);
	     	sp_1.moveDown();
    	}
    }
}


function changeColorDamage(ctx, spArray, i) {
	//var sp = new Ship(spArray[i].x, spArray[i].y, spArray[i].width, spArray[i].height, 3, true, imageRepository.shipEnemyDamaged);
	spArray[i].changeImg(imageRepository.shipEnemyDamaged);
	// substituir no array
	spArray.splice(i, 1, spArray[i]);
}

// muda de cor a nave quando embate missel
function changeColor(ctx, spArray, i) {
	spArray[i].changeImg(imageRepository.shipEnemy);
	// substituir no array
	spArray.splice(i, 1, spArray[i]);
}


//resedenho, actualizações, ...
function render(ctx, spArray, bulletsArray, reqID, dt)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;



		// move naves
		moveShip(ctx, spArray);


		VerifyCollision_NVL_MULTI(ctx, spArray);

		//apagar canvas
		ctx.clearRect(0, 0, cw, ch);
		//move background
		backgroundMoving(ctx, spArray);

		draw_NVL(ctx, spArray);

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


function moveBulletsPlayer2(ctx, bulletsArray) {
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

function shoot(ctx, spArray, bulletsArray, ship, type, speed) {
	var size = SIZE_POOL


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
