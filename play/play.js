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
var flag_space=true;

// qt de balas
var bulletsArray = [];
var SIZE_POOL = 10;
var countBullets = 0;

var NUM_METEROIDS=8;
var CURRENT_METEROIDS=0;
var meteroidArray=[];

// niveis 
var NVL_1 = false;
var NVL_2 = false;
var NVL_3 = true;
var GAME_OVER = false;
var NVL_WON = false;

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
	loadSprites_NVL_3(ctx);
	console.log("OK");

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
			// espaço de tempo entre tiros
			if (flag_space == true) {
				flag_space = false;
				shoot(ctx, spArray, bulletsArray);
				setTimeout(function(){ flag_space = true; }, 500);
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
		var ship = searchSprite(spArray, "bom");
		ship.changeImg(imageRepository.shipDown);
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

function loadSprites_NVL_1(ctx) {

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;
}

function loadSprites_NVL_2(ctx) {

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var sp = new ShipEnemy(cw/2, 200, nw, nh, 3, true, imageRepository.shipEnemy, 1000, "mau");
	spArray[nLoad] = sp;
	nLoad++;

	var nw = imageRepository.shield_star.naturalWidth;
	var nh = imageRepository.shield_star.naturalHeight;
	var sp = new Boost(300, 300, nw, nh, true, imageRepository.shield_star, "shield_star");
	spArray[nLoad] = sp;
	nLoad++;
}

function loadSprites_NVL_3(ctx) {

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var sp = new ShipEnemy(0, 0, nw, nh, 3, true, imageRepository.shipEnemy, 1000, "mau");
	spArray[nLoad] = sp;
	nLoad++;

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

function draw_NVL_2(ctx, spArray) 
{	
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		// so desenha sprites vivos...
		if (spArray[i].alive == true) {
			spArray[i].draw(ctx);

			if (spArray[i].getType() == "ship") {

				if (spArray[i].getDamageLenght() != 0) {
					for (let j=0; j<spArray[i].getDamageLenght(); j++) {

						if (spArray[i].damage[j].alive == true)
							spArray[i].damage[j].drawDamage(ctx);
						else
							spArray[i].damage.splice(j, 1);
					}
				}
				else if (spArray[i].shield == true)	{
					spArray[i].objShield.draw(ctx);
					spArray[i].objShield.followCoor(spArray[i].x, spArray[i].y);
				}	
			}
		}
		if (spArray[i].alive == false) {
				console.log("[i] spArray Elements: "+dim);
				spArray.splice(i,1);
				dim = spArray.length;
				console.log("[f] spArray Elements: "+dim);
		}
	}
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
		NVL_1 = false;
		NVL_2 = true;
		console.log("ganhou");

		// wait 2 sec..
		setTimeout(function() { loadSprites_NVL_2(ctx); }, 2000);
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
	     	sp.moveLeft();
		}
	}
    if (RIGHT) {
    	//sp.x += sp.speed;
    	if (sp.x + sp.width < ctx.canvas.width) {
    		sp.changeImg(imageRepository.shipRight);
	     	sp.moveRight();	  
    	}
    }
    if (UP) {
    	//sp.y -= sp.speed;
    	if (sp.y >= 0) {
    		sp.changeImg(imageRepository.shipUp);
	     	sp.moveUp(); 
    	}
    }
    if (DOWN) {
    	//sp.y += sp.speed;
    	if (sp.y + sp.height < ctx.canvas.height) {
    		sp.changeImg(imageRepository.shipDown);
	     	sp.moveDown();   
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

// colisoes
function VerifyCollision_NVL_2(ctx, spArray, bulletsArray) {

	// percorrer figura e ve bounding box
	for (let i=0; i<spArray.length; i++) {
		// colisoes só para a nave	
		if (spArray[i].getType() == "ship") {
			for (let j=i+1; j<spArray.length; j++) {	
				if (spArray[i].verifyIntersect(spArray[j]) == true) {
					// verifica interseção com boosts
					// se acerta na estrela
					if (spArray[j].getType() == "boost") {
						if (spArray[j].name == "shield_star" && spArray[i].shield == false) {
							// ativa shield
							spArray[i].changeShieldState(2000);
							// muda flag de duração do shield
							setTimeout(function(){ spArray[i].shield = false; }, spArray[i].shieldDuration);
							// remove
							spArray[j].alive = false;
						}
					}
					else if (spArray[i].shield == false) {
						console.log("^^_^^");
						// tira vida
						if (spArray[i].name == "bom") {
							var dmg = 80;
							spArray[i].life -= dmg;
							spArray[i].updateLife(dmg, imageRepository.life2, imageRepository.life1);
						}
					}
				}
			}
		}	
		if (spArray[i].getType() != "background" && spArray[i].getType() != "backgroundObject") {
			// se houver balas e for diferente da nave que disparou	
			if (bulletsArray.length != 0 && spArray[i].img.id == "shipEnemy") {
				for (let k=0; k<bulletsArray.length; k++) {
					if (bulletsArray[k].verifyIntersect(spArray[i]) == true) {
						// "matar" bullet
						bulletsArray[k].alive = false;
						console.log("puummm e pshhhhhhh");

						if (bulletsArray[k].damage < spArray[i].life) {
							// >> funcoes a fazer para quando ocorre colisao
							changeColorDamage(ctx, spArray, i);
							// muda de cor apos 0.5seg e se a vida tirada for menor que a vida atual da nave
							setTimeout(changeColor, 500, ctx, spArray, i); 
						}

						// --- DANO ---
						// balas que acertaram na nave
						// passar info para esse objeto
						spArray[i].damage.push(new Damage(spArray[i].x, spArray[i].y, spArray[i].width, spArray[i].height, bulletsArray[k].damage));	

						// retirar dano
						spArray[i].RemoveLife(bulletsArray[k].damage);							
					}
				}
			}
		}	
	}
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

function shoot(ctx, spArray, bulletsArray) {
	var ship = spArray[2];
	var size = SIZE_POOL;

	var getShipX = ship.x;
	var getShipY = ship.y;
	var getShipWidth = ship.width;
	var getShipHeigth = ship.height;

	if (countBullets != size) {
		// definir tempo entre bullets
		var sp = new Bullet(getShipX+getShipWidth/2, getShipY, imageRepository.bullet.naturalWidth, imageRepository.bullet.naturalHeight, 3, true, imageRepository.bullet);
		bulletsArray.push(sp);
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

function drawMeteroids(ctx, meteroidArray) {

		var nw = imageRepository.meteroid.naturalWidth;
		var nh = imageRepository.meteroid.naturalHeight;

		// SE CHEGAR AOS 100 CURRENT_METEROIDS ACABA ESTE NIVEL
		if (countMeteroidsPassed == 100) {
			NVL_WON = true;
		}


		var time = 500;
		if (CURRENT_METEROIDS <= NUM_METEROIDS) {
			// aumentar meteroids, tempo de spawn...

			if (countMeteroidsPassed <= 25) {

				if (flag_RISE == true) {
					NUM_METEROIDS += 7;
					flag_RISE = false;
				}

			} else if (countMeteroidsPassed <= 50) {

				if (flag_RISE == false) {
					flag_RISE = true;
					NUM_METEROIDS += 7;
				}

			} else if (countMeteroidsPassed <= 75) {

				if (flag_RISE == true) {
					NUM_METEROIDS += 7;
					flag_RISE = false;
				}

			} else {

				if (flag_RISE == false) {
					flag_RISE = true;
					NUM_METEROIDS += 7;
				}

			}

			setTimeout(function() 	{	var sp = new Meteroid(Math.floor(Math.random() * 700 + 100), -Math.floor(Math.random()*10 + imageRepository.meteroid.naturalHeight), nw, nh, true, imageRepository.meteroid, "meteroid");
										meteroidArray.push(sp);
									}, time+CURRENT_METEROIDS*time);

			CURRENT_METEROIDS++;
		}

	for (let i=meteroidArray.length-1; i>=0; i--) {
		
		if (meteroidArray[i].y >= ctx.canvas.height) {

			// SCORE
			countMeteroidsPassed++;

			// coloca-o novamente em cima
			meteroidArray[i].x = Math.floor(Math.random() * 700 + 100);
			meteroidArray[i].y = -Math.floor(Math.random()*10 + meteroidArray[i].height);

		} else {
			meteroidArray[i].draw(ctx);
			meteroidArray[i].y += 4;		
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
