"use strict";

// repositorios para desenhar imagens com sprites
var imageRepository = new function() {

	this.shipDown = new Image();
	this.shipUp = new Image();
	this.shipLeft = new Image();
	this.shipRight = new Image();
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

	this.chestOpen = new Image();
	this.chestClose = new Image();
	this.shield_star = new Image();
	this.shield = new Image();
	this.explosion = new Image();


	this.meteroid = new Image();
	this.meteroid_big = new Image();
	this.meteroid_small = new Image();
	this.rocks1 = new Image();
	this.rocks2 = new Image();
	this.rocks3 = new Image();
	this.rocks4 = new Image();
	this.rocks5 = new Image();

	this.boss = new Image();
	this.fireball1 = new Image();
	this.fireball2 = new Image();
	this.fireball3 = new Image();


	// -- SRC --
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

	this.chestOpen.src = "../resources/boosts/chestOpen.png";
	this.chestClose.src = "../resources/boosts/chestClose.png";
	this.shield_star.src = "../resources/boosts/shield_star.png";
	this.shield.src = "../resources/boosts/shield.png";
	this.explosion.src = "../resources/bullets/explosion.gif";

	this.meteroid.src = "../resources/meteroids/meteroid.png";
	this.meteroid_big.src = "../resources/meteroids/meteroid_big.png";
	this.meteroid_small.src = "../resources/meteroids/meteroid_small.png";
	this.rocks1.src = "../resources/meteroids/rocks1.png";
	this.rocks2.src = "../resources/meteroids/rocks2.png";
	this.rocks3.src = "../resources/meteroids/rocks3.png";
	this.rocks4.src = "../resources/meteroids/rocks4.png";
	this.rocks5.src = "../resources/meteroids/rocks5.png";

	this.boss.src = "../resources/ships/final_boss.png";
	this.fireball1.src = "../resources/bullets/fireball1.png";
	this.fireball2.src = "../resources/bullets/fireball2.png";
	this.fireball3.src = "../resources/bullets/fireball3.png";

	this.AsteroidsImgArray = [this.meteroid_small, this.meteroid_big, this.rocks1, this.rocks2, this.rocks3, this.rocks4, this.rocks5];

}

var soundRepository = new function() {

	this.explosionSound = new Audio('../resources/sounds/explosao.wav');
	this.shootSound1 = new Audio('../resources/sounds/shoot.wav');
	this.shootSound2 = new Audio('../resources/sounds/shoot2.wav');
	this.hitSound = new Audio('../resources/sounds/hit.wav');
	this.lvlUpSound = new Audio('../resources/sounds/passarnivel.wav');
	this.audio = new Audio('../resources/sounds/navigatemenu.wav');
	this.shootSoundArray = [this.shootSound1, this.shootSound2];

}
