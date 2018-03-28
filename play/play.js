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

// repositorios para desenhar imagens com sprites
var imageRepository = new function() {
	var nLoad = 0;
	var totLoad = 3;

	this.bullet = new Image();
	this.background = new Image();
	this.ship = new Image(); 

	function imageLoad() {
		nLoad++;
		if (nLoad == totLoad) {
			// meter condição aqui para disparar o init na main
		}
	}

	this.background.onload = function() {
		imageLoad();
	}
	this.ship.onload = function() {
		imageLoad();
	}
	this.bullet.onload = function() {
		imageLoad();
	}

	this.background.id = "background";
	this.ship.id = "ship1";
	this.bullet.id = "bullet";
		
	this.background.src = "../resources/backgrounds/background_space2.jpg";
	this.ship.src = "../resources/ships/ship1.png"; 
	this.bullet.src = "../resources/bullets/bullet1.png";
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
	var sp = new SpriteImage(0, 0, nw, nh, 3, false, imageRepository.background);
	spArray[nLoad] = sp;
	nLoad++;		

	var nw = imageRepository.ship.naturalWidth;
	var nh = imageRepository.ship.naturalHeight;
	var sp = new SpriteImage(cw/2, ch-ch/6, nw, nh, 3, false, imageRepository.ship);
	spArray[nLoad] = sp;
	nLoad++;	
/*
	var nw = imageRepository.bullet.naturalWidth;
	var nh = imageRepository.bullet.naturalHeight;
	var sp = new SpriteImage(200, 200, nw, nh, 3, false, imageRepository.bullet);
	spArray[nLoad] = sp;
	nLoad++;*/

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
		else if (ev.keyCode == 32)
			shoot(ctx, spArray, bulletsArray);
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
	}
	startAnim(ctx, spArray, bulletsArray);	
}

//iniciar animação
function startAnim(ctx, spArray, bulletsArray)
{
	draw(ctx, spArray);
	animLoop(ctx, spArray, bulletsArray);	
}


//desenhar sprites
function draw(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		spArray[i].draw(ctx);
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

// iniciar pool
function poolBullets(bullet) {
	var size = SIZE_POOL;
	var pool = [];

	for (let i=0; i < size; i++) {
		pool[i] = bullet;
	}

	for (let i=0; i < size; i++) {
		console.log(pool[i]);
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

	render(ctx, spArray, bulletsArray, reqID);



}

// colisoes
function VerifyCollision(ctx, spArray) {
	// percorrer figura e ve bounding box
	for (let i=0; i<spArray.length; i++) {
		for (let j=i+1; j<spArray.length; j++) {
			if (spArray[i].verifyIntersect(spArray[j]) == true) {
				console.log("^^_^^");
				turbo(ctx, spArray);
			}
		}
	}	
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

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);
	//move background
	backgroundMoving(ctx, spArray);
	// verifica colisao
	//VerifyCollision(ctx, spArray);
	draw(ctx, spArray);

	drawBullets(ctx, bulletsArray);
}

function backgroundMoving(ctx, spArray) {
	var sp = spArray[0];

	sp.drawBackground(ctx);
	sp.y += 1;

	if (sp.y >= ctx.canvas.height)
		sp.y = 0;
	
}

function moveShip(ctx, spArray) {
	var sp = spArray[1];

	if (LEFT) {
		//sp.x -= sp.speed;
		if (sp.getX()  >= 0)
	     	sp.moveLeft();
	}
    if (RIGHT) {
    	//sp.x += sp.speed;
    	if (sp.x + sp.width < ctx.canvas.width)
	     	sp.moveRight();	  
    }
    if (UP) {
    	//sp.y -= sp.speed;
    	if (sp.y >= 0)
	     	sp.moveUp(); 
    }
    if (DOWN) {
    	//sp.y += sp.speed;
    	if (sp.y + sp.height < ctx.canvas.height)
	     	sp.moveDown();   
    }
}

function moveBullets(ctx, bulletsArray) {
	var pool = bulletsArray;
	for (var i = 0; i < pool.length; i++) {
		if (pool[i].y >= 0) {
			pool[i].y -= pool[i].speed;
		}
		else {
			// retirar do array
			pool.splice(i, 1);
			countBullets--;
		}
	}
}

function shoot(ctx, spArray, bulletsArray) {
	var ship = spArray[1];
	var size = SIZE_POOL;


	var getShipX = spArray[1].x;
	var getShipY = spArray[1].y;
	var getShipWidth = spArray[1].width;
	var getShipHeigth = spArray[1].height;

	if (countBullets != size) {
		var sp = new SpriteImage(getShipX+getShipWidth/2, getShipY, imageRepository.bullet.naturalWidth, imageRepository.bullet.naturalHeight, 3, false, imageRepository.bullet);
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


