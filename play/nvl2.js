"use strict";

(function()
{
	window.addEventListener("load", main);
}());



function loadSprites_NVL_2(ctx) {

	var cw = ctx.canvas.width;
	var ch = ctx.canvas.height;

	var nw = imageRepository.shipEnemy.naturalWidth;
	var nh = imageRepository.shipEnemy.naturalHeight;
	var sp = new ShipEnemy(cw/2, 200, nw, nh, 3, true, imageRepository.shipEnemy, 1000, "mau");
	spArray[nLoad] = sp;
	nLoad++;

	var nw = imageRepository.shield_star.naturalWidth;
	var nh = imageRepository.shield_star.naturalHeight;
	var sp = new Boost(300, 300, nw, nh, true, imageRepository.shield_star, "shield_star");
	spArray[nLoad] = sp;
	nLoad++;
}


function draw_NVL_2(ctx, spArray) 
{	
	var dim = spArray.length;

	for (let i = 0; i < dim; i++)
	{
		// so desenha sprites vivos...
		if (spArray[i].alive == true) {
			spArray[i].draw(ctx);

			if (spArray[i].getType() == "ship") {

				if (spArray[i].getDamageLenght() != 0) {
					for (let j=0; j<spArray[i].getDamageLenght(); j++) {

						if (spArray[i].damage[j].alive == true)
							spArray[i].damage[j].drawDamage(ctx);
						else
							spArray[i].damage.splice(j, 1);
					}
				}
				else if (spArray[i].shield == true)	{
					spArray[i].objShield.draw(ctx);
					spArray[i].objShield.followCoor(spArray[i].x, spArray[i].y);
				}	
			}
		}
		if (spArray[i].alive == false) {
				console.log("[i] spArray Elements: "+dim);
				spArray.splice(i,1);
				dim = spArray.length;
				console.log("[f] spArray Elements: "+dim);
		}
	}
}


// colisoes
function VerifyCollision_NVL_2(ctx, spArray, bulletsArray) {

	// percorrer figura e ve bounding box
	for (let i=0; i<spArray.length; i++) {
		// colisoes só para a nave	
		if (spArray[i].getType() == "ship") {
			for (let j=i+1; j<spArray.length; j++) {	
				if (spArray[i].verifyIntersect(spArray[j]) == true) {
					// verifica interseção com boosts
					// se acerta na estrela
					if (spArray[j].getType() == "boost") {
						if (spArray[j].name == "shield_star" && spArray[i].shield == false) {
							// ativa shield
							spArray[i].changeShieldState(2000);
							// muda flag de duração do shield
							setTimeout(function(){ spArray[i].shield = false; }, spArray[i].shieldDuration);
							// remove
							spArray[j].alive = false;
						}
					}
					else if (spArray[i].shield == false) {
						console.log("^^_^^");
						// tira vida
						if (spArray[i].name == "bom") {
							var dmg = 80;
							spArray[i].life -= dmg;
							spArray[i].updateLife(dmg, imageRepository.life2, imageRepository.life1);
						}
					}
				}
			}
		}	
		if (spArray[i].getType() != "background" && spArray[i].getType() != "backgroundObject") {
			// se houver balas e for diferente da nave que disparou	
			if (bulletsArray.length != 0 && spArray[i].img.id == "shipEnemy") {
				for (let k=0; k<bulletsArray.length; k++) {
					if (bulletsArray[k].verifyIntersect(spArray[i]) == true) {
						// "matar" bullet
						bulletsArray[k].alive = false;
						console.log("puummm e pshhhhhhh");

						if (bulletsArray[k].damage < spArray[i].life) {
							// >> funcoes a fazer para quando ocorre colisao
							changeColorDamage(ctx, spArray, i);
							// muda de cor apos 0.5seg e se a vida tirada for menor que a vida atual da nave
							setTimeout(changeColor, 500, ctx, spArray, i); 
						}

						// --- DANO ---
						// balas que acertaram na nave
						// passar info para esse objeto
						spArray[i].damage.push(new Damage(spArray[i].x, spArray[i].y, spArray[i].width, spArray[i].height, bulletsArray[k].damage));	

						// retirar dano
						spArray[i].RemoveLife(bulletsArray[k].damage);							
					}
				}
			}
		}	
	}
}