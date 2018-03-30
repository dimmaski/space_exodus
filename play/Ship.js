"use strict";

class Ship
{
	constructor(x, y, w, h, speed, alive, img)
	{
		//posição e movimento
		this.xIni = x;
		this.yIni = y;
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.speed = speed;

		//imagem
		this.img = img;		
		
		// bullet que lhe acertou, start at null
		this.hitBullets = [];
		this.numBullets= this.hitBullets.length;
	}

	getType() {
		return "ship";
	}

	setTeste(t) {
		this.teste = t;
	}

	printHitBullets() 
	{	
		//console.log(this.teste);
		//console.log(this.HitBullets.length);
		for (let i=0; i<this.hitBullets.length; i++) {
			console.log(this.hitBullets[i]);
		}
	}

	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}	


	reset(ev, ctx)
	{
		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
		this.clickable = this.clickableIni;
	}


	verify_inside(mx, my) {
		console.log(this.img);
		if (mx >= this.x && 
			mx <= this.x + this.width && 
			my >= this.y && 
			my <= this.y + this.height)
			return true;
		else
			return false;
		
	}

	verifyIntersect(fig) {
		if ((fig.getX() + fig.getLarg() ) < this.getX() || 
			fig.getX() > (this.getX() + this.getLarg()) ||
			(fig.getY() + fig.getAlt()) < this.getY() ||
			fig.getY() > (this.getAlt() + this.getY())) {
			return false;
		} 
		else
			return true;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getLarg() {
		return this.width;
	}
	
	getAlt() {
		return this.height;
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

class Damage
{
	constructor(x, y, damage) {
		this.x = x;
		this.y = y;
		this.damage = damage;
	}

}