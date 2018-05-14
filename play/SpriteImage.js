"use strict";

class Sprite
{
	constructor(x, y, w, h, img, alive) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.img = img;
		this.alive = alive;
		this.name = "none";
		this.imageData = this.getImageData(img);
	}

	getImageData(img){

    var canvasnova = document.createElement("canvas");
    canvasnova.width = this.width;
    canvasnova.height = this.height;

    var ctx = canvasnova.getContext("2d");
    ctx.drawImage(img, 0, 0, this.width, this.height);

    return ctx.getImageData(0, 0, this.width, this.height);
	}

	verifyIntersect(fig) {
	    if (this.verifyColisionBoundingBox(fig)) {
	        if (this.verifyColisionPixelByPixel(fig))
	            return true;
	        else
	        	return false;
	    }
	    else
	        return false;
	}

	verifyColisionPixelByPixel(fig) {
	    let x_left = Math.floor(Math.max(fig.x, this.x));
	    let x_right = Math.floor(Math.min(fig.x + fig.width, this.x + this.width));
	    let y_top = Math.floor(Math.max(fig.y, this.y));
	    let y_bottom = Math.floor(Math.min(fig.y + fig.height, this.y + this.height));

	    for (let y = y_top; y < y_bottom; y++) {
	        for (let x = x_left; x < x_right; x++) {
	            let x_0 = Math.round(x - fig.x);
	            let y_0 = Math.round(y - fig.y);
	            let n_pix = y_0 * fig.width + x_0; //n pixel to check
	            let pix_op = fig.imageData.data[4 * n_pix + 3]; //opacity (R G B A)

	            let element_x_0 = Math.round(x - this.x);
	            let element_y_0 = Math.round(y - this.y);
	            let element_n_pix = element_y_0 * this.width + element_x_0; //n pixel to check
	            let element_pix_op = this.imageData.data[4 * element_n_pix + 3]; //opacity (R G B A)

	            if (pix_op != 0 && element_pix_op != 0) {
	                return true;
	            }
	        }
	    }
	    return false;
		}

	verifyColisionBoundingBox(fig) {
			if ((fig.x + fig.width) < this.x ||
			fig.x > (this.x + this.width) ||
			(fig.y + fig.height) < this.y ||
			fig.y > (this.height + this.y)) {
				return false;
			}
			else
			return true;
		}

	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}


	getType() {
		return "none";
	}
}

class Background extends Sprite
{
	constructor(x, y, w, h, speed, alive, img)
	{
		super(x,y,w,h,img, alive);
		this.speed = speed;
		this.img = img;

		//eliminar ou nao
		this.aliveIni = alive;
		this.alive = alive;
	}

	getType() {
		return "background";
	}

	drawBackground(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y - this.height+2, this.width, this.height);
	}
}

"use strict";

class Ship extends Sprite
{
	constructor(x, y, w, h, speed, alive, imgShip, objLife, objShield, life, name)
	{
		super(x,y,w,h,imgShip, alive);
		this.speed = speed;
		this.imgShip = imgShip;
		this.objLife = objLife;
		this.objShield = objShield;
		this.life = life;
		this.alive = true;
		this.name = name;
		// array de dano do navio
		this.damage = [];
		this.flagLife2 = true;
		this.flagLife1 = false;

		this.shield = false;
		this.bulletsArray=[];

		// muda para parametro
		this.shieldDuration = 3000;
	}

	updateLife(dmg, newImg1, newImg2) {
		if (this.flagLife2 == true) {
			if (dmg <= 100) {
				this.objLife.changeImg(newImg1);
				// redimensionar imagem
				this.objLife.resizeToLife2();
				this.flagLife2 = false;
				this.flagLife1 = true;
				this.flagLifeZero = false;
			}
		}
		else if (this.flagLife1 == true) {
			this.objLife.changeImg(newImg2);
			// redimensionar imagem
			this.objLife.resizeToLife1();
			this.flagLife1 = false;
			this.flagLifeZero = true;

		}
		//else if (this.flagLifeZero == true)
			//alert("Game Over");


		/*
		else if (dmg <= 200)
			this.objLife.img = newImg2;
		else
			this.objLife.alive = false;*/
		// GAME OVER;
	}

	changeShieldState(time) {
		console.log("Mudouuuu");
		this.shield = true;
		this.objShield.x = this.x;
		this.objShield.y = this.y;
	}

	getDamageLenght() {
		return this.damage.length;
	}

	getType() {
		return "ship";
	}
	changeImg(newImg) {
		this.img = newImg;
	}

	RemoveLife(dmg, newImg) {
		this.life -= dmg;

		if (this.life < 0) {
			console.log("DEAD");
			this.alive = false;
		}
	}

	removeLifeDmg(dmg) {
		this.life-=dmg;
	}

	moveLeft() {
		this.x -= this.speed;
	}

	moveRight() {
		this.x += this.speed;
	}

	moveUp() {
		this.y -= this.speed;
	}

	moveDown() {
		this.y += this.speed;
	}

}

class Bullet extends Sprite{

	constructor(x, y, w, h, speed, alive, img, name) {
		//posição e movimento
		super(x,y,w,h,img, alive);
		this.speed = speed;
		this.img = img;
		// bala viva
		this.alive = alive;
		this.name = name;
		// dano
		this.damage = Math.floor((Math.random() * 200) + 100);
		// nave no qual o tiro acertou, start null
		this.hitShip = null;
		this.speedMissile = 0.1;
	}

	moveMissile(x, y, shipX, shipY) {
		if (this.speedMissile < 1.5)
			this.speedMissile = this.speedMissile + 0.05;
		if (this.x < shipX)
			this.x+=this.speedMissile;
		else if (this.x > shipX)
			this.x-=this.speedMissile;
		if (this.y < shipY)
			this.y+=this.speedMissile;
		else if (this.y > shipY)
			this.y-=this.speedMissile;
	}

	moveFireball(x, y, shipX, shipY) {
		if (this.x < shipX)
			this.x += this.speed;
		else if (this.x > shipX)
			this.x -= this.speed;
		if (this.y < shipY)
			this.y += this.speed;
		else if (this.y > shipY)
			this.y -= this.speed;
	}
}

class Damage
{
	constructor(x, y, w, h, damage) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.damage = damage;
		this.conta=0;
		this.alive=true;
		this.fontsize=13;
	}

	drawDamage(ctx) {
		var str =""+this.fontsize+"px Comic Sans MS"
		ctx.font = str;
		ctx.fillStyle = "red";
		ctx.textAlign = "center";

		ctx.fillText(-this.damage, this.x+this.w/2, this.y-this.h/6);

		if (this.conta!=20) {
			this.y -= 1;
			this.conta++;
			if (this.fontsize < 20)
				this.fontsize++;
		}
		else {
			this.conta=0;
			this.alive=false;
		}
	}
}

class BackgroundObject extends Sprite
{
	constructor(x, y, w, h, img, alive, name) {
		super(x, y, w, h, alive, img);
		this.name = name;
	}

	resizeToLife2(img) {
		this.width = this.width - this.width/3;
		this.changeImg(img);
	}

	resizeToLife1(img) {
		this.width = this.width - this.width/2;
		this.changeImg(img);
	}

	changeImg(img) {
		this.img = img;
	}

	followCoor(x, y) {
		this.x = x;
		this.y = y;
	}

	getType() {
		return "backgroundObject";
	}
}

class Boost extends Sprite
{
	constructor(x, y, w, h, img, alive, name) {
		super(x, y, w, h, alive, img);
		this.name = name;
	}
	getType() {
		return "boost";
	}
}

class Meteroid extends Sprite
{
	constructor(x, y, w, h, img, alive, name) {
		super(x, y, w, h, alive, img);
		this.name = name;
	}


	drawMeteroid(ctx) {
		ctx.drawImage(this.img, this.x, this.y - this.height+2, this.width, this.height);
	}

	getType() {
		return "meteroid";
	}
}

class ShipEnemy extends Sprite
{
	constructor(x, y, w, h, speed, alive, imgShip, life, name, life_bar)
	{
		super(x,y,w,h,imgShip, alive);
		this.speed = speed;
		this.imgShip = imgShip;
		this.life = life;
		this.alive = true;
		this.name = name;
		// array de dano do navio
		this.damage = [];
		this.bulletsArray=[];
		this.life_bar = life_bar;
	}


	getDamageLenght() {
		return this.damage.length;
	}

	getType() {
		return "shipEnemy";
	}
	changeImg(newImg) {
		this.imgShip = newImg;
	}

	RemoveLife(dmg, newImg) {
		this.life -= dmg;

		if (this.life < 0) {
			console.log("DEAD");
			this.alive = false;
		}
	}

	moveShip(x, y, shipX, shipY) {
		if (this.x < shipX)
			this.x += this.speed;
		else if (this.x > shipX)
			this.x -= this.speed;
		if (this.y < shipY)
			this.y += this.speed;
		else if (this.y > shipY)
			this.y -= this.speed;
	}


	moveLeft() {
		this.x -= this.speed;
	}

	moveRight() {
		this.x += this.speed;
	}

	moveUp() {
		this.y -= this.speed;
	}

	moveDown() {
		this.y += this.speed;
	}

}
