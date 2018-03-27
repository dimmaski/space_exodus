"use strict";

var TURBO = 20;

class SpriteImage
{
	constructor(x, y, w, h, speed, clickable, img)
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
		
		//rato
		this.clickableIni = clickable;
		this.clickable = clickable;			
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

	turbo(ev, ctx) {	
		this.speed = TURBO;
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

	mouseOverBoundingBox(ev, ctx) //ev.target é a canvas
	{
		var mx = ev.offsetX;  //mx, my = mouseX, mouseY na canvas
		var my = ev.offsetY;

		//console.log(mx+" , "+my);
		//console.log(this.x+" - "+this.y);

		var carroData = ctx.getImageData(this.x, this.y, this.width, this.height);
		// pixel onde se clicou
		var imageData = ctx.getImageData(mx, my, 1, 1);

		// verificar opacidade deste
		// se o pixel[3] == 0, não tem nada sobreposto
		if (imageData.data[3] == 0 || this.verify_inside(mx, my) == false) {
			return false;
		}
		return true;						
	}




	clickedBoundingBox(ev, ctx) //ev.target é a canvas
	{
		if (!this.clickable)
			return false;
		else
			return this.mouseOverBoundingBox(ev, ctx);
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