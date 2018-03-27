"use strict";

(function()
{
	window.addEventListener("load", main);
}());

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
	background.addEventListener("load", imgLoadedHandler);
	background.id= "background";
	background.src = "../resources/ships/ship1.png"; 

	var img = new Image(); 
	img.addEventListener("load", imgLoadedHandler);
	img.id= "ship1";
	img.src = "../resources/ships/ship1.png";  //dá ordem de carregamento da imagem
	console.log(img);

	window.addEventListener("keydown", keydownHandler);
	window.addEventListener("keyup", keyupHandler);	

	function imgLoadedHandler(ev)
	{
		var img = ev.target;
		var nw = img.naturalWidth;
		var nh = img.naturalHeight;

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;

		var sp = new SpriteImage(cw/2, ch/2, nw, nh, 10, false, img);
		spArray[0] = sp;

		nLoad++;		

		if (nLoad == totLoad)
		{
			var ev2 = new Event("initend");
			ev2.spArray = spArray;
			ctx.canvas.dispatchEvent(ev2);
		}
	}

	function keydownHandler(ev) {
		var sp = spArray[0];
		switch (ev.keyCode) {
           	case 37:
           		if (sp.x - sp.speed >= 0)
	          		sp.moveLeft();
	          	break;
          	case 39:
          		if (sp.x + sp.speed + sp.width < ctx.canvas.width)
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

	function keyupHandler(ev) {
		
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

	// verifica colisao
	//VerifyCollision(ctx, spArray);

	render(ctx, spArray, reqID);
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

	draw(ctx, spArray);
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