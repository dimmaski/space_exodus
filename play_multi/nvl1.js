"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var flag_tocou_1=false;
var flag_tocou_2=false;

var player_1_threelifes = true;
var player_1_twolifes = false;
var player_1_onelifes = false;

var player_2_threelifes = true;
var player_2_twolifes = false;
var player_2_onelifes = false;
var flagExplosion=0;

function loadSprites_NVL_1(ctx) {

	NVL_1 = true;

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;
}


//desenhar sprites
function draw_NVL(ctx, spArray)
{
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		// so desenha sprites vivos...
		if (spArray[i].alive == true) {
			if(spArray[i].name=="player1"){
				moveBullets(ctx,spArray[i].bulletsArray);
				drawBullets(ctx,spArray[i].bulletsArray);
			}
			if(spArray[i].name=="player2"){
				moveBulletsPlayer2(ctx,spArray[i].bulletsArray);
				drawBullets(ctx,spArray[i].bulletsArray);
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

	if (flagExplosion == 1 || flagExplosion == 2) {
		explosion();
	}

}


function updateShipLife(spArray,ship) {
	console.log(player_1_twolifes);

	if(ship.name=="player1"){
		setTimeout(function() {
			flag_tocou_1 = false;
		}, 1000);

		if(player_1_threelifes==true){
			setTimeout(function() {
				player_1_twolifes = true;
			}, 1000);
			player_1_threelifes=false;
			var sp = searchSprite(spArray, "vida1");
			sp.resizeToLife2(imageRepository.life2);
			}
		else if(player_1_twolifes==true){
			player_1_twolifes=false;
			var sp = searchSprite(spArray, "vida1");
			sp.resizeToLife2(imageRepository.life1);
			player_1_onelifes=true;
		}else if(player_1_onelifes==true){
					flagExplosion=1;
		}
	}

	if(ship.name=="player2"){
		setTimeout(function() {
			flag_tocou_2 = false;
		}, 1000);


		if(player_2_threelifes==true){
			player_2_threelifes=false;
			var sp = searchSprite(spArray, "vida2");
			sp.resizeToLife2(imageRepository.life2);
			player_2_twolifes=true;
			}
		else if(player_2_twolifes==true){
			player_2_twolifes=false;
			var sp = searchSprite(spArray, "vida2");
			sp.resizeToLife2(imageRepository.life1);
			player_2_onelifes=true;
		}else if(player_2_onelifes==true){
				flagExplosion=2;
		}
	}
}

function explosion() {
	var str = "player";
	str += flagExplosion;
	var ship = searchSprite(spArray, str);

	if(ship.name=="player2"){
		ship.img = imageRepository.explosion;
		ship.width=ship.width+2;
		ship.height=ship.height+2;
		ship.x-=1;
	}
	else if (ship.name=="player1") {
		ship.img = imageRepository.explosion;
		ship.width=ship.width+2;
		ship.height=ship.height+2;
		ship.y-=3;

	}
	if (ship.width>=300 || ship.height>=300) {
			flagExplosion=false;
			GAME_OVER=true;
		}
}

function VerifyCollision_NVL_MULTI(ctx, spArray) {

var player1_ship = searchSprite(spArray,"player1");
var player2_ship = searchSprite(spArray,"player2");

var arraybulletsplayer1=player1_ship.bulletsArray;
var arraybulletsplayer2=player2_ship.bulletsArray;

for(let i=0;i<arraybulletsplayer1.length;i++){
	if(arraybulletsplayer1[i].verifyIntersect(player2_ship) && flag_tocou_2==false){
		flag_tocou_2=true;
		updateShipLife(spArray,player2_ship);
	}
}

for(let i=0;i<arraybulletsplayer2.length;i++){
	if(arraybulletsplayer2[i].verifyIntersect(player1_ship)&& flag_tocou_1==false){
		flag_tocou_1=true;
		updateShipLife(spArray,player1_ship);
	}
}

}
