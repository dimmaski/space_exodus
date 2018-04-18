"use strict";

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
	this.shipKamikaze = new Image();

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
	this.shipKamikaze.onload = function() {
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
	this.shipKamikaze.id = "shipKamikaze";

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

	this.shipKamikaze.src = "../resources/ships/ship2.png";
}
