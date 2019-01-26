//Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;

document.body.appendChild(canvas);

//Background Image
let bgReady = false;
const bgImage = new Image();

bgImage.onload = () => {
	bgReady = true;
};
bgImage.src = "images/background.png";

//Hero Image
let heroReady = false;
const heroImage = new Image();

heroImage.onload = () => {
	heroReady = true;
};
heroImage.src = "images/hero.png";

//Monster Image
let monsterReady = false;
const monsterImage = new Image();

monsterImage.onload = () => {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

//Game Object
const hero = {
	speed:256
};
const monster = {};
let monsterCaught = 0;

// Handle keyboard controls
const keysDown = {};

addEventListener("keydown", (e) => {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) =>  {
    delete keysDown[e.keyCode];
}, false);


//Reset the game when the player catches a monster
const reset = () => {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	//Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

//Update Object
const update = (modifier) => {
	if(38 in keysDown){
		hero.y -= hero.speed * modifier;
	}
	if(40 in keysDown){
		hero.y += hero.speed * modifier;
	}
	if(37 in keysDown){
		hero.x -= hero.speed * modifier;
	}
	if(39 in keysDown){
		hero.x += hero.speed * modifier;
	}

	//What the f(h)**k touching
	if(
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	){
		++monsterCaught;
		reset();
	}
};

//Draw
const render = () => {
	if(bgReady){
		ctx.drawImage(bgImage,0,0);
	}

	if(heroReady){
		ctx.drawImage(heroImage,hero.x,hero.y);
	}

	if(monsterReady){
		ctx.drawImage(monsterImage,monster.x,monster.y);
	}

	//Score
	ctx.fillStyle = "rgb(250,250,250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins Caught:"+ monsterCaught,32,32);	

};

//The main game loop
const main = () => {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	//Request to do this again ASAP
	requestAnimationFrame(main);
};

//RequestAnimationFrame
const w = window;
requestAnimationFrame = 
	w.requestAnimationFrame || 
	w.webkitRequestAnimationFrame ||
	w.msRequestAnimationFrame ||
	w.mozRequestAnimationFrame;

//Play
let then = Date.now();
reset();
main();