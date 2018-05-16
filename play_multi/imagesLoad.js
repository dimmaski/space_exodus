"use strict";

// repositorios para desenhar imagens com sprites
var imageRepository = new function() {

	this.shipDown = new Image();
	this.shipUp = new Image();
	this.shipLeft = new Image();
	this.shipRight = new Image();

	this.player2ship = new Image();
	this.player2shipleft = new Image();
	this.player2shipright = new Image();
	this.player2shipdown = new Image();

	this.shipEnemy = new Image();
	this.shipEnemyDamaged = new Image();
	this.shipKamikaze = new Image();
	this.ship2 = new Image();
	this.ship3 = new Image();
	this.ship4 = new Image();
	this.ship5 = new Image();
	this.ship6 = new Image();
	this.ship7 = new Image();
	this.ship8 = new Image();
	this.ship9 = new Image();


	this.bullet = new Image();
	this.bullet_red = new Image();
	this.bullet_blue = new Image();
	this.bullet_yellow = new Image();

	this.missile = new Image();
	this.background = new Image();

	this.life1 = new Image();
	this.life2 = new Image();
	this.life3 = new Image();
	this.boss_life_bar = new Image();
	this.ship_life_bar = new Image();

	this.shield_star = new Image();
	this.shield = new Image();
	this.meteroid = new Image();
	this.explosion = new Image();

	this.boss = new Image();
	this.fireball1 = new Image();
	this.fireball2 = new Image();
	this.fireball3 = new Image();


	// -- SRC --

	this.player2ship.src = "../resources/ships/player2.png";
	this.player2shipleft.src = "../resources/ships/player2LEFT.png";
	this.player2shipright.src = "../resources/ships/player2RIGHT.png";
	this.player2shipdown.src = "../resources/ships/player2UP.png";

	this.shipDown.src = "../resources/ships/shipDown.png";
	this.shipUp.src = "../resources/ships/shipUp.png";
	this.shipLeft.src = "../resources/ships/shipLeft.png";
	this.shipRight.src = "../resources/ships/shipRight.png";
	this.shipEnemy.src = "../resources/ships/shipEnemy.png";
	this.shipEnemyDamaged.src = "../resources/ships/shipEnemyDamaged.png";
	this.shipKamikaze.src = "../resources/ships/ship2.png";
	this.ship2.src = "../resources/ships/ship2.png";
	this.ship3.src = "../resources/ships/ship3.png";
	this.ship4.src = "../resources/ships/ship4.png";
	this.ship5.src = "../resources/ships/ship5.png";
	this.ship6.src = "../resources/ships/ship6.png";
	this.ship7.src = "../resources/ships/ship7.png";
	this.ship8.src = "../resources/ships/ship8.png";
	this.ship9.src = "../resources/ships/ship9.png";

	this.background.src = "../resources/backgrounds/background_space2.jpg";
	this.bullet.src = "../resources/bullets/bullet1.png";
	this.bullet_red.src = "../resources/bullets/bullet_red.png";
	this.bullet_blue.src = "../resources/bullets/bullet_blue.png";
	this.bullet_yellow.src = "../resources/bullets/bullet_yellow.png";
	this.missile.src = "../resources/bullets/missil.png";

	this.life1.src = "../resources/life/life1.png";
	this.life2.src = "../resources/life/life2.png";
	this.life3.src = "../resources/life/life3.png";
	this.boss_life_bar.src = "../resources/life/boss_life_bar.png";
	this.ship_life_bar.src = "../resources/life/ship_life_bar.png";

	this.shield_star.src = "../resources/boosts/shield_star.png";
	this.shield.src = "../resources/boosts/shield.png";
	this.meteroid.src = "../resources/meteroids/meteroid.png";
	this.explosion.src = "../resources/bullets/explosion.gif";

	this.boss.src = "../resources/ships/final_boss.png";
	this.fireball1.src = "../resources/bullets/fireball1.png";
	this.fireball2.src = "../resources/bullets/fireball2.png";
	this.fireball3.src = "../resources/bullets/fireball3.png";


}
