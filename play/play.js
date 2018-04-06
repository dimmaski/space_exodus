"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var LEFT = false; 
var RIGHT = false;
var UP = false;
var DOWN = false;
var SPACE = false;

// qt de balas
var SIZE_POOL = 10;
var countBullets = 0;
var conta=0;
var temp=[];

var flag_space=true;

var NUM_METEROIDS=1;
var meteroidArray=[];

// niveis 
var NVL_1 = false;
var NVL_2 = true;
var GAME_OVER = false;



// repositorios para desenhar imagens com sprites
var imageRepository = new function() {
	var nLoad = 0;
	var totLoad = 3;

	this.shipDown = new Image(); 
	this.shipUp = new Image(); 
	this.shipLeft = new Image(); 
	this.shipRight = new Image(); 

	this.bullet = new Image();
	this.background = new Image();
	this.shipEnemy = new Image();
	this.shipEnemyDamaged = new Image();

	this.life1 = new Image();
	this.life2 = new Image();
	this.life3 = new Image();

	this.shield_star = new Image();
	this.shield = new Image();

	this.meteroid = new Image();


	function imageLoad() {
		nLoad++;
		if (nLoad == totLoad) {
			// meter condição aqui para disparar o init na main
		}
	}

	this.shipDown.onload = function() {
		imageLoad();
	}
	this.shipUp.onload = function() {
		imageLoad();
	}
	this.shipLeft.onload = function() {
		imageLoad();
	}
	this.shipRight.onload = function() {
		imageLoad();
	}

	this.background.onload = function() {
		imageLoad();
	}
	this.bullet.onload = function() {
		imageLoad();
	}
	this.shipEnemy.onload = function() {
		imageLoad();
	}
	this.shipEnemyDamaged.onload = function() {
		imageLoad();
	}

	this.life1.onload = function() {
		imageLoad();
	}	
	this.life2.onload = function() {
		imageLoad();
	}
	this.life3.onload = function() {
		imageLoad();
	}
	this.shield_star.onload = function() {
		imageLoad();
	}
	this.shield.ondload = function() {
		imageLoad();
	}
	this.meteroid.ondload = function() {
		imageLoad();
	}
	
	// -- ID --
	this.shipDown.id = "shipDown";
	this.shipUp.id = "shipUp";
	this.shipLeft.id = "shipLeft";
	this.shipRight.id = "shipRight";


	this.background.id = "background";
	this.bullet.id = "bullet";
	this.shipEnemy.id = "shipEnemy";
	this.shipEnemyDamaged.id = "shipEnemyDamaged";

	this.life1.id = "life1";
	this.life2.id = "life2";
	this.life3.id = "life3";
	
	this.shield_star.id = "shield_star";
	this.shield.id = "shield";

	this.meteroid.id = "meteroid";

	// -- SRC --
	this.shipDown.src = "../resources/ships/shipDown.png"; 
	this.shipUp.src = "../resources/ships/shipUp.png"; 
	this.shipLeft.src = "../resources/ships/shipLeft.png"; 
	this.shipRight.src = "../resources/ships/shipRight.png"; 

	this.background.src = "../resources/backgrounds/background_space2.jpg";	
	this.bullet.src = "../resources/bullets/bullet1.png";
	this.shipEnemy.src = "../resources/ships/shipEnemy.png"; 
	this.shipEnemyDamaged.src = "../resources/ships/shipEnemyDamaged.png";


	this.life1.src = "../resources/life/life1.png";
	this.life2.src = "../resources/life/life2.png";		
	this.life3.src = "../resources/life/life3.png";	

	this.shield_star.src = "../resources/boosts/shield_star.png";
	this.shield.src = "../resources/boosts/shield.png";

	this.meteroid.src = "../resources/meteroids/meteroid.png";
}


function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx);  //carregar todos os componentes

}

function init(ctx) {
	var nLoad = 0;
	var totLoad = 2;
	var spArray = new Array(totLoad);
	var bulletsArray = [];

	// carregar sprites
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

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

	var nw = imageRepository.shield.naturalWidth;
	var nh = imageRepository.shield.naturalHeight;
	var shield = new BackgroundObject(200, 100, nw, nh, true, imageRepository.shield, "shield");

	var nw = imageRepository.shipDown.naturalWidth;
	var nh = imageRepository.shipDown.naturalHeight;
	var ship = new Ship(cw/2, ch-ch/6, nw, nh, 3, true, imageRepository.shipDown, life, shield, 1000, "bom");
	spArray[nLoad] = ship;
	nLoad++;	

	if (NVL_1 == true) {

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
	else if (NVL_2 == true) {

		var nw = imageRepository.meteroid.naturalWidth;
		var nh = imageRepository.meteroid.naturalHeight;
		// criar varios meteroids
		for (let i=0; i<NUM_METEROIDS; i++) {
			// inicializar meteroids a tempo random da posicao 0
			var sp = new Meteroid(Math.floor((Math.random() * 700) + 1), -Math.floor((Math.random() * 200) + 1), nw, nh, true, imageRepository.meteroid, "meteroid");
			
			meteroidArray[i]=sp;
		}
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
		ship.changeImg(imageRepository.shipDown);
	}

	startAnim(ctx, spArray, bulletsArray);	

}

//iniciar animação
function startAnim(ctx, spArray, bulletsArray)
{
	draw(ctx, spArray);
	animLoop(ctx, spArray, bulletsArray);	
}

function drawMeteroids(ctx, meteroidArray) {

	for (let i=0; i<meteroidArray.length; i++) {
		//console.log(meteroidArray.length);
		meteroidArray[i].draw(ctx);

		meteroidArray[i].y += 4;	
		
		if (meteroidArray[i].y >= ctx.canvas.height) {
			meteroidArray[i].y = -Math.floor((Math.random() * 200) + 1);
			// evitar meteroids sobrepostos
			// guarda x anterior
			meteroidArray[i].x = Math.floor((Math.random() * 800 - meteroidArray[i].width) + (1+ meteroidArray[i].width));
		}	
	}
}


//desenhar sprites
function draw(ctx, spArray)
{
	var dim = spArray.length;

	if (NVL_1 == true) {

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

	else if (NVL_2 == true) {
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
	
	if (GAME_OVER == false) {
		render(ctx, spArray, bulletsArray, reqID);
	}
	// game over
	else {
		ctx.font = "40px Comic Sans MS"
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("GAME OVER", ctx.canvas.width/2, ctx.canvas.height/2); 

		ctx.font = "20px Comic Sans MS"
		ctx.fillStyle = "red";
		ctx.textAlign = "center";
		ctx.fillText("[enter] to restart", ctx.canvas.width/2, ctx.canvas.height/2+30); 


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
	if (ev.keyCode == 13) {
		GAME_OVER = false;

		// apaga array 
		meteroidArray.splice(0, meteroidArray.length);
		// cria novo
		// reposiciona nave
		var ship = searchSprite(spArray, "ship");
		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;
		ship.x = cw/2;
		ship.y = ch-ch/6;

		
		// cria meteroids

		//meteroidArray[j].x = Math.floor((Math.random() * 800 - meteroidArray[j].width) + (1+ meteroidArray[j].width));
		//meteroidArray[j].y = -Math.floor((Math.random() * 200) + 1);
	}
}

// colisoes
function VerifyCollision(ctx, spArray, bulletsArray) {


	if (NVL_1 == true) {
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
	else if (NVL_2 == true) {
		for (let i=0; i<spArray.length; i++) {
			// colisoes só para a nave	
			if (spArray[i].getType() == "ship") {
				for (let j=0; j<meteroidArray.length; j++) {
					if (spArray[i].verifyIntersect(meteroidArray[j]) == true) {
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

	// move nave
	moveShip(ctx, spArray);
	// gere balas
	moveBullets(ctx, bulletsArray);

	//moveMeteroids(ctx, meteroidArray);

	// verifica colisao
	// tirar background 
	VerifyCollision(ctx, spArray, bulletsArray);

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);
	//move background
	backgroundMoving(ctx, spArray);


	draw(ctx, spArray);

	drawMeteroids(ctx, meteroidArray);

	drawBullets(ctx, bulletsArray);
}

function searchSprite(spArray, name) {
	var conta=0;
	var searched;

	for (let i=0; i<spArray.length; i++) {
		if (spArray[i].getType() == name) {
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