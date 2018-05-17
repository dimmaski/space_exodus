"use strict";

(function()
{
    window.addEventListener("load", main);
}());

var flagSpawnShip = true;
var flagStopSpawn = false;
var shipsSpawned = 0;
var arrayEnemyShips = [];
var shipsKilled=0;
var wave=1;
var displayWave=false;
var displayShipsKilled=true;

var flagShootBoss=false;
var ShootsTakenByWave=5;
var countShoots=0;
var minDmg=400;
var maxDmg=800;

var currentBossShots=0;
var maxBossShots=2;
var delayBetweenShots=2000;
var shotSpeed=1;
var flagBossShots=true;
var yFollowShip=300;

var lifeEnemyShips=1000;
var speedEnemyShips=0.5;


// ALTERAR AQUI PARA MAIS NAVES
var maxShipsKilled=2;

function main()
{
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	init(ctx, 3);

}


function loadSprites_NVL_3(ctx) {

    var nw = imageRepository.boss.naturalWidth;
    var nh = imageRepository.boss.naturalHeight;
    var sp = new ShipEnemy(200, 0, (3/2)*nw, (3/2)*nh, 3, true, imageRepository.boss, lifeEnemyShips, "boss");
    spArray[nLoad] = sp;
    nLoad++;

    var nw = imageRepository.boss_life_bar.naturalWidth;
    var nh = imageRepository.boss_life_bar.naturalHeight;
    var life_boss = new BackgroundObject(145, 10, nw, nh, true, imageRepository.boss_life_bar, "boss_life_bar");
    spArray[nLoad] = life_boss;
    nLoad++;

    spawnShips();

    displayWave=true;
    setTimeout(function() {
        displayWave=false;
    }, 2000);
}


function draw_NVL_3(ctx, spArray) {

    for (let i=0; i < spArray.length; i++) {

        if (spArray[i].alive == true) {

            spArray[i].draw(ctx);

            if (spArray[i].name == "bom") {
                drawBullets(ctx, spArray[i].bulletsArray);
                moveBullets(ctx, spArray[i].bulletsArray);
            }
            else if (spArray[i].name == "boss") {
                drawBullets(ctx, spArray[i].bulletsArray);
                moveBulletsBoss(ctx, spArray[i].bulletsArray);
            }
        }
        else if (spArray[i].alive == false) {
            console.log("[i] spArray Elements: "+spArray.length);
            spArray.splice(i,1);
            console.log("[f] spArray Elements: "+spArray.length);
        }
    }

    for (let i=arrayEnemyShips.length-1; i>=0; i--) {
        if (arrayEnemyShips[i].alive) {

            arrayEnemyShips[i].draw(ctx);

            if (arrayEnemyShips[i].name == "bossShips") {
                var ship = searchSprite(spArray, "bom");
                arrayEnemyShips[i].moveShip(arrayEnemyShips[i].x, arrayEnemyShips[i].y, ship.x, ship.y);
                arrayEnemyShips[i].life_bar.followCoor(arrayEnemyShips[i].x, arrayEnemyShips[i].y-15);
                arrayEnemyShips[i].life_bar.draw(ctx);
            }
        }
        else {
            arrayEnemyShips.splice(i,1);
        }
    }

    // desenha naves
    if (flagSpawnShip == true && flagStopSpawn == false && shipsSpawned < maxShipsKilled && flagShootBoss == false && flagBossShots == true) {
        flagSpawnShip = false;
        setTimeout(function() {
            spawnShips();
            flagSpawnShip = true;
        }, 1000);
    }

    displayText(ctx, spArray);

}

function displayText(ctx, spArray) {
    if (displayShipsKilled == true) {
        ctx.font = "20px retro"
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(shipsKilled+"/"+maxShipsKilled, ctx.canvas.width-35, ctx.canvas.height-5);
    }

    if (displayWave == true) {
        ctx.font = "40px retro"
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText("Wave "+wave, ctx.canvas.width/2, ctx.canvas.height/2);
    }
}

function spawnShips() {

    // posicao de spawn
    var pos = [215, 545];

    // x random (0 ou 1)
    var randomCor = Math.floor(Math.random()*2);

    var waveShip;
    var ShipEnemyArray = [imageRepository.ship4, imageRepository.ship5, imageRepository.ship6, imageRepository.ship7, imageRepository.ship8]

    if (wave == 1) {
        waveShip = ShipEnemyArray[0];
    }
    else if (wave == 2) {
        waveShip = ShipEnemyArray[1];
    }
    else if (wave == 3) {
        waveShip = ShipEnemyArray[2];
    }
    else if (wave == 4) {
        waveShip = ShipEnemyArray[3];
    }
    else if (wave == 5) {
        waveShip = ShipEnemyArray[4];
    }

    var nw_life_bar = imageRepository.ship_life_bar.naturalWidth;
    var nh_life_bar = imageRepository.ship_life_bar.naturalHeight;
    var life_bar = new BackgroundObject(pos[randomCor], 120, nw_life_bar, nh_life_bar, true, imageRepository.ship_life_bar, "life_bar");

    var nw = waveShip.naturalWidth;
    var nh = waveShip.naturalHeight;
    var sp = new ShipEnemy(pos[randomCor], 120, nw, nh, speedEnemyShips, true, waveShip, 1000, "bossShips", life_bar);
    arrayEnemyShips.push(sp);
    shipsSpawned++;
}


function VerifyCollision_NVL_3(ctx, spArray) {
    var enemyShip, ourShip, boss;
    // nave com boss
    ourShip = searchSprite(spArray, "bom");
    boss = searchSprite(spArray, "boss");

    if (ourShip.verifyIntersect(boss)) {
        soundRepository.hitSound.play();
        GAME_OVER = true;
    }

    for (let j=0; j<arrayEnemyShips.length; j++) {

            enemyShip = arrayEnemyShips[j];

            if (ourShip.verifyIntersect(enemyShip)) {
                soundRepository.hitSound.play();
                updateShipLife(spArray);
            }

            // interseção das balas com nave "mau"
            // se houver balas e for diferente da nave que disparou
            if (ourShip.bulletsArray.length != 0) {
                for (let k=0; k<ourShip.bulletsArray.length; k++) {
                    if (ourShip.bulletsArray[k].verifyIntersect(enemyShip) == true) {
                        soundRepository.hitSound.play();
                        ourShip.bulletsArray[k].alive = false;

                        var dmg = Math.floor((Math.random()*maxDmg)+minDmg);
                        var dmg_life_bar = (dmg*enemyShip.life_bar.width)/enemyShip.life;

                        // tirar vida
                        enemyShip.life -= dmg;
                        // tirar vida da barra de vida em igual porporção
                        enemyShip.life_bar.width -= dmg_life_bar;

                        if (enemyShip.life <= 0) {
                            enemyShip.alive = false;
                            shipsKilled++;
                            if (shipsKilled == maxShipsKilled && wave <= 5) {
                                shipsKilled=0;
                                shipsSpawned=0;

                                maxShipsKilled = wave*2;

                                flagShootBoss = true;
/*
                                for (let i=0; i<spArray.length; i++)
                                    console.log(spArray[i].name)
                                spawnBoosts(0, 600, 200, 600, "shield", 1000);*/
                            }
                        }
                    }
                }
            }
        }

        if (flagShootBoss == true || wave >= 6) {
            bossColision(ctx, spArray);

            if (flagBossShots == true && currentBossShots < maxBossShots) {
                flagBossShots = false;
                setTimeout(function() {
                    bossAttack(ctx, spArray);
                    currentBossShots++;
                    flagBossShots = true;
                }, delayBetweenShots);
            }
        }
    }


function bossAttack(ctx, spArray) {
    var boss = searchSprite(spArray, "boss");
    shoot(ctx, spArray, bulletsArray, boss, "fireball", shotSpeed);
}


function moveBulletsBoss(ctx, bulletsArray) {
    var pool = bulletsArray;
    for (var i = 0; i < pool.length; i++) {
        if (pool[i].y <= 600) {
            if (pool[i].alive == false) {
                pool.splice(i, 1);
                countBullets--;
            }
            else {
                // DIFICULDADE BOSS
                // até y seguir a nossa nave, depois segue em diferente
                if (pool[i].y < yFollowShip) {
                    var ship = searchSprite(spArray, "bom");
                    pool[i].moveFireball(pool[i].x, pool[i].y, ship.x, ship.y);
                }
                else {
                    pool[i].y += pool[i].speed;
                }
            }
        }
        else {
            pool.splice(i, 1);
            countBullets--;
        }
    }
}

function bossColision(ctx, spArray) {
    for (let i=0; i<spArray.length; i++) {
        if (spArray[i].name == "boss") {

            var ourShip = searchSprite(spArray, "bom");
            var boss = spArray[i];

            if (ourShip.bulletsArray.length != 0) {
                for (let k=0; k<ourShip.bulletsArray.length; k++) {
                    if (ourShip.bulletsArray[k].verifyIntersect(boss) == true) {

                        ourShip.bulletsArray[k].alive = false;
                        var life_bar = searchSprite(spArray, "boss_life_bar");

                        // MUDAR PARA 10
                        life_bar.width -= 20;
                        if (life_bar.width < 0) {
                            life_bar.width = 0;
                            flagShootBoss = false;
                            boss.img = imageRepository.explosion;

                            setTimeout(function () {
                                boss.alive = false;
                            }, 1000);

                            flagStopSpawn=true;
                            displayShipsKilled=false;

                            // ACABOU O JOGO

                        }
                        else {
                            countShoots += 1;
                            if (countShoots > ShootsTakenByWave) {
                                countShoots=0;
                                flagShootBoss = false;
                                currentBossShots=0;

                                // atualizar dificuldades
                                // BOSS
                                maxBossShots+=2;
                                delayBetweenShots-=250;
                                yFollowShip+=50;
                                shotSpeed+=0.5;
                                // SHIPS
                                lifeEnemyShips+=500;
                                speedEnemyShips+=0.2;

                                if (wave <= 4) {
                                    wave++;
                                    displayWave=true;
                                    setTimeout(function() {
                                        displayWave=false;
                                    }, 2000);
                                }
                            }
                        }
                    }
                }
            }
            if (boss.bulletsArray.length != 0) {
                for (let k=0; k<boss.bulletsArray.length; k++) {
                    if (boss.bulletsArray[k].verifyIntersect(ourShip) == true) {
                        GAME_OVER = true;
                    }
                }
            }
        }
    }
}
