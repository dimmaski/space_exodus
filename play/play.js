"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var LEFT = false; 
var RIGHT = false;
var UP = false;
var DOWN = false;


function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var spArray;  //sprite array

	canvas.addEventListener("initend", initEndHandler);
	init(ctx);  //carregar todos os componentes

	//funções locais para gestão de eventos
	function initEndHandler(ev)
	{
		//instalar listeners do rato	
		ctx.canvas.addEventListener("click", cch);
		
		spArray = ev.spArray;

		//iniciar a animação
		startAnim(ctx, spArray);
		
	}

	var cch = function(ev)
	{
		canvasClickHandler(ev, ctx, spArray);	
	}

	
}


function init(ctx) {
	var nLoad = 0;
	var totLoad = 1;
	var spArray = new Array(totLoad);

	var background = new Image();
	background.addEventListener("load", bgLoader);
	background.id= "background";
	background.src = "../resources/backgrounds/background_space2.jpg";

	var img = new Image(); 
	img.addEventListener("load", shipsLoader);
	img.id= "ship1";
	img.src = "../resources/ships/ship1.png"; 
	//dá ordem de carregamento da imagem

	window.addEventListener("keydown", keydownHandler);
	window.addEventListener("keyup", keyupHandler);	

	function shipsLoader(ev) {
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;

		var sp = new SpriteImage(cw/2, ch-ch/6, nw, nh, 3, false, img);
		spArray[nLoad] = sp;
		nLoad++;		

		var ev2 = new Event("initend");
		ev2.spArray = spArray;
		ctx.canvas.dispatchEvent(ev2);
	}

	function bgLoader(ev)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;

		var sp = new SpriteImage(0, 0, nw, nh, 10, false, img);
		spArray[nLoad] = sp;
		nLoad++;		

		var ev2 = new Event("initend");
		ev2.spArray = spArray;
		ctx.canvas.dispatchEvent(ev2);
		
	}
/*
	function keydownHandler(ev) {
		var sp = spArray[1];
		console.log(ev.keyCode);

		spArray[1].clear(ctx)
		switch (ev.keyCode) {
           	case 37:
           		if (sp.x - sp.speed >= 0)
	          		sp.moveLeft();
	          	break;
          	case 39:
          		
	          		sp.moveRight();
	          	break;
          	case 38:
          		if (sp.y - sp.speed >= 0)
	          		sp.moveUp();
	          	break;
          	case 40:
          		if (sp.y + sp.speed +sp.height < ctx.canvas.height)
	          		sp.moveDown();
	          	break;
          	}
        var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;

	}
*/

	function keydownHandler(ev) {	
		if (ev.keyCode == 37) 
			LEFT = true;
		else if (ev.keyCode == 39) 
			RIGHT = true;
		else if (ev.keyCode == 38) 
			UP = true;
		else if (ev.keyCode == 40) 
			DOWN = true;

	}

	function keyupHandler(ev) {
		if (ev.keyCode == 37) 
			LEFT = false;
		else if (ev.keyCode == 39) 
			RIGHT = false;
		else if (ev.keyCode == 38) 
			UP = false;
		else if (ev.keyCode == 40) 
			DOWN = false;
	}	

}

//iniciar animação
function startAnim(ctx, spArray)
{
	draw(ctx, spArray);
	animLoop(ctx, spArray);	
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


//-------------------------------------------------------------
//--- controlo da animação: coração da aplicação!!!
//-------------------------------------------------------------
var auxDebug = 0;  //eliminar
function animLoop(ctx, spArray)
{	
	var al = function(time)
	{
		animLoop(ctx, spArray);
	}
	var reqID = window.requestAnimationFrame(al);

	// move nave
	moveShip(ctx, spArray[1]);

	// verifica colisao
	//VerifyCollision(ctx, spArray);

	render(ctx, spArray, reqID);
}

function moveShip(ctx, sp) {

	if (LEFT)
		if (sp.getX()  >= 0)
	     	sp.moveLeft();
    if (RIGHT)
    	if (sp.x + sp.width < ctx.canvas.width)
	     	sp.moveRight();	  
    if (UP)
    	if (sp.y >= 0)
	     	sp.moveUp(); 
    if (DOWN)
    	if (sp.y + sp.height < ctx.canvas.height)
	     	sp.moveDown();   

}

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
function render(ctx, spArray, reqID, dt)
{
	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	//apagar canvas
	ctx.clearRect(0, 0, cw, ch);

	//move background
	backgroundMoving(ctx, spArray);


	draw(ctx, spArray);
}

function backgroundMoving(ctx, spArray) {

	spArray[0].drawBackground(ctx);
	spArray[0].y += 1;

	if (spArray[0].y >= ctx.canvas.height)
		spArray[0].y = 0;
	

}


//-------------------------------------------------------------
//--- interacção com o rato
//-------------------------------------------------------------
function canvasClickHandler(ev, ctx, spArray)
{
	//spArray[1].clickedBoundingBox(ev, ctx);
	if (spArray[0].clickedBoundingBox(ev, ctx))
	{
		spArray[0].reset(ev, ctx);		
		animLoop(ctx, spArray);
	}
}

