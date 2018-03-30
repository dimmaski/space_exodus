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
	}

	draw(ctx)
	{
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx)
	{
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}

	verifyIntersect(fig) {
		if ((fig.x + fig.width) < this.x || 
			fig.x > (this.x + this.width) ||
			(fig.y + fig.height) < this.y ||
			fig.y > (this.height + this.y)) {
			return false;
		} 
		else
			return true;
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
		return "sprite";
	}

	drawBackground(ctx) 
	{
		ctx.drawImage(this.img, this.x, this.y - this.height+2, this.width, this.height);
	}
}

"use strict";
 
class Ship extends Sprite
{
	constructor(x, y, w, h, speed, alive, img, life)
	{
		super(x,y,w,h,img, alive);
		this.speed = speed;
		this.img = img;		
		this.life = life;
		this.alive = true;
		// array de dano do navio
		this.damage = [];
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

	RemoveShip() {
		this.img = null;
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
	constructor(x, y, w, h, speed, alive, img) {
		//posição e movimento
		super(x,y,w,h,img, alive);
		this.speed = speed;
		this.img = img;	
		// bala viva		
		this.alive = alive;	
		// dano
		this.damage = Math.floor((Math.random() * 200) + 100);
		// nave no qual o tiro acertou, start null
		this.hitShip = null;
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
	}

	drawDamage(ctx) {
		ctx.font = "15px Comic Sans MS";
		ctx.fillStyle = "red";
		ctx.textAlign = "center";

		ctx.fillText(-this.damage, this.x+this.w/2, this.y-this.h/6); 

		if (this.conta!=20) {
			this.y -= 1;
			this.conta++;
		} 
		else {
			this.conta=0;
			this.alive=false;
		}
	}



}
