//Images of 5 characters to be chosen
'use strict';
var app = app || {};
app.hero_img = [
	'images/char-boy.png',
	'images/char-cat-girl.png',
	'images/char-horn-girl.png',
	'images/char-pink-girl.png',
	'images/char-princess-girl.png'
];
app.hero_index = 0;
var i;

//The coordinate pairs of rocks and gems
app.rock_x = [0, 101, 202, 303, 404];
app.rock_y = [55, 145, 220];
app.gem_x = [10, 111, 210, 315, 420];
app.gem_y = [90, 175, 265];

//An 2-D matrix used to record which is been placed by rocks because gems and rocks can not be put in the same cell
app.record_x = [false, false, false, false, false];
app.record_y = [false, false, false];

//Objects and function about the enemy
var Enemy = function(pos_Y){
	this.sprite = "images/enemy-bug.png";
	this.pos_X = -50;
	this.pos_Y = pos_Y;
};
//The function is used to update position of bugs
Enemy.prototype.update = function(dt){
	this.pos_X += dt; 
};
//The function is tu show the image of bugs
Enemy.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.pos_X, this.pos_Y);
};
//The function is to check whether bugs are out of bound of the whole image
Enemy.prototype.out_bound = function(){
	if (this.pos_X > 500){
		return true;
	}
	return false;
};



//Object and function about our hero
var Player = function(){
	this.hero = app.hero_img[app.hero_index];
	this.pos_X = 202;
	this.pos_Y = 400;
};
//The function is used to update position of the hero
Player.prototype.update = function(){
	this.hero = app.hero_img[app.hero_index];
};
//The function is used to reset the position of the hero after we reach the water
//and the new position is random in the grass cells.
Player.prototype.win = function(){
	var x_array = [0, 101, 202, 303, 404];
	var y_array = [320, 400];
	var x_index = Math.round(Math.random() * 4.99 - 0.5);
	var y_index = Math.round(Math.random() * 1.99 - 0.5);
	this.pos_X = x_array[x_index];
	this.pos_Y = y_array[y_index];
};
//The function is to check whether we win to reach the water
Player.prototype.win_check = function(){
		if (this.pos_Y <= 50){
			return true;
		}
		return false;
};
//The function is to reset the postion of our hero after colliding with bugs.
Player.prototype.lose = function(){
	this.pos_X = 202;
	this.pos_Y = 400;
};
//The function is to show the image of hero in the whole context
Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.hero), this.pos_X, this.pos_Y);
};
//The function is to control input from keyboard
Player.prototype.handleInput = function(dic){
	var check_array = this.rock_check(allRocks);
	switch(dic){
		case 'left':
			if (bonuds_check(this.pos_X - 101, this.pos_Y) && check_array[0]){
		 		this.pos_X -= 101;
			}
			break;
		case 'up':
			if (bonuds_check(this.pos_X, this.pos_Y - 83) && check_array[1]){
		 		this.pos_Y -= 83;
		 	}
			break;
		case 'right':
			if (bonuds_check(this.pos_X + 101, this.pos_Y) && check_array[2]){
		 		this.pos_X += 101;
			}
			break;
		case 'down':
			if (bonuds_check(this.pos_X, this.pos_Y + 83) && check_array[3]){
		 		this.pos_Y += 83;
			}
			break;
	}
};



//Object and function about the rock, there are 3 pieces of rocks and their position 
//in stone is random. Player can not pass or reach the rock.
var Rock = function(){
	this.rock_image = 'images/Rock.png';
	var index_rock_x = Math.round(Math.random() * 4.99 - 0.5),
		index_rock_y = Math.round(Math.random() * 2.99 - 0.5);
	while (app.record_x[index_rock_x] && app.record_y[index_rock_y]){
		index_rock_x = Math.round(Math.random() * 4.99 - 0.5),
		index_rock_y = Math.round(Math.random() * 2.99 - 0.5);
	}
	app.record_x[index_rock_x] = true;
	app.record_y[index_rock_y] = true;
	this.pos_X = app.rock_x[index_rock_x];
	this.pos_Y = app.rock_y[index_rock_y];

};
//The funtcion is uesd to show the rock images in the whole image
Rock.prototype.render = function(){
	ctx.drawImage(Resources.get(this.rock_image), this.pos_X, this.pos_Y);
};



//Object and function about selector
var Selector = function(){
	this.select_img = 'images/Selector.png';
	this.pos_X = 202;
	this.pos_Y = 400;
};
//The function is used to show the image about the selector
Selector.prototype.render = function(){
	ctx.drawImage(Resources.get(this.select_img), this.pos_X, this.pos_Y);	
};
//The function is to response of the click to change characters.
Selector.prototype.update = function(){
	document.addEventListener('click', function(e){
		if (app.hero_index == 4){
			app.hero_index = 0;
		}else {
			app.hero_index++;
		}
	});
};



//Object and function about heart of our hero
var Heart = function(pos_X){
	this.life = 'images/Heart.png';
	this.pos_Y = 530;
	this.pos_X = pos_X;
};
//The function is used to show the image of heart
Heart.prototype.render = function(){
	ctx.drawImage(Resources.get(this.life), this.pos_X, this.pos_Y, 30, 50);		
};



//Object and functions about the gem. At start, I set the blue gem but later I found 
//orange gems are cuter.
var Gem_blue = function(){
	this.bluegem = 'images/Gem Orange.png';
	var index_gemb_x = Math.round(Math.random() * 4.99 - 0.5),
		index_gemb_y = Math.round(Math.random() * 2.99 - 0.5);
	while (app.record_x[index_gemb_x] && app.record_y[index_gemb_y]){
		index_gemb_x = Math.round(Math.random() * 4.99 - 0.5),
		index_gemb_y = Math.round(Math.random() * 2.99 - 0.5);
	}
	this.pos_X = app.gem_x[index_gemb_x];
	this.pos_Y = app.gem_y[index_gemb_y];
}
//The function is to update position about gems. Each time the player get a gem, another gem 
//will be generated randomly and there is possibility that two gems are in the exactly same cell
Gem_blue.prototype.update = function(){
	var index_gemb_x = Math.round(Math.random() * 4.99 - 0.5),
		index_gemb_y = Math.round(Math.random() * 2.99 - 0.5);
	while (app.record_x[index_gemb_x] && app.record_y[index_gemb_y]){
		index_gemb_x = Math.round(Math.random() * 4.99 - 0.5),
		index_gemb_y = Math.round(Math.random() * 2.99 - 0.5);
	}
	this.pos_X = app.gem_x[index_gemb_x];
	this.pos_Y = app.gem_y[index_gemb_y];
};
//the function is show the images of gem
Gem_blue.prototype.render = function(){
	ctx.drawImage(Resources.get(this.bluegem), this.pos_X, this.pos_Y, 80, 120);		
};



//Object and functions about the star. Each time the player get more 50 scores, the star rain 
//will be generated.
var Star = function(pos_X){
	this.bling = 'images/Star.png';
	this.pos_X = pos_X;
	this.pos_Y = 50;
};
//The function is to update the position of star rain
Star.prototype.update = function(){
	this.pos_Y += 5;
};
//The function is to reset position after the former star rain
Star.prototype.reset = function(){
	this.pos_Y = 50;
};
//The function is used to show the image of stars
Star.prototype.render = function(){
	ctx.drawImage(Resources.get(this.bling), this.pos_X, this.pos_Y, 30, 50);			
};



//The function is used to check whether the player is out of bound
function bonuds_check(x, y) {
	if (x > -50 && x < 410 && y > -50 && y < 483) {
		return true;
	}
	return false;
}
//The function is used to check whether two elements have been collides. Including player 
//and bugs, player and gem.
function collides(x1, y1, x2, y2, w, h){
	var w1 = w;
	var w2 = w;
	var h1 = h;
	var h2 = h;
	if (((x1 <= x2+w2 && x1 >=x2) && (y1 <= y2+h2 && y1 >= y2)) ||
        ((x1+w1 <= x2+w2 && x1+w1 >= x2) && (y1 <= y2+h2 && y1 >= y2)) ||
        ((x1 <= x2+w2 && x1 >=x2) && (y1+h1 <= y2+h2 && y1+h1 >= y2)) ||
        ((x1+w1 <= x2+w2 && x1+w1 >= x2) && (y1+h1 <= y2+h2 && y1+h1 >= y2))){
		return true;
	}
	return false;
}
//The function is to check whether the player is collided with bugs
Player.prototype.collision_check = function(allEnemies){
	if (this.pos_Y > 10 && this.pos_Y < 350){
		for (var i = 0; i < allEnemies.length; i++){
			if (collides(this.pos_X, this.pos_Y, allEnemies[i].pos_X, allEnemies[i].pos_Y, 90, 80)){
				return true;
			}
		}
	}
	return false;
};
//The function is to make sure cell with rocks is not accessible to the player.
Player.prototype.rock_check = function(){
	var x1 = this.pos_X,
		y1 = this.pos_Y,
		x2, y2,
		check_array = [true, true, true, true];
	for (i = 0; i < allRocks.length; i++){
		x2 = allRocks[i].pos_X;
		y2 = allRocks[i].pos_Y;
		if (Math.abs(y1 - y2) < 30 && x1 > x2 && x1 - 105 < x2){
			check_array[0] = false;
		}
		if (Math.abs(y1 - y2) < 30 && x1 < x2 && x1 + 105 > x2){
			check_array[2] = false;
		}
		if (Math.abs(x1 - x2) < 30 && y1 > y2 && y1 - 171 < y2){
			check_array[1] = false;
		}
		if (Math.abs(x1 - x2) < 30 && y1 < y2 && y1 + 171 > y2){
			check_array[3] = false;
		}
	}
	return check_array;
};
//The function is to check whether the player get the gem
function gem_check(player, BlueGem){
	var x1 = player.pos_X,
		y1 = player.pos_Y,
		x2, y2,
		check_array_gem = [false, false];
	for (i = 0; i < BlueGem.length; i++){
		x2 = BlueGem[i].pos_X;
		y2 = BlueGem[i].pos_Y;
		if (collides(x1, y1, x2, y2, 80, 40)){
			check_array_gem[i] = true;
		}
	}
	return check_array_gem;
}



//This part is initialize of those objects.
var allEnemies = [new Enemy(65), new Enemy(150), new Enemy(235)];
var player = new Player();
var allRocks = [new Rock(), new Rock(), new Rock()];
var BlueGem = [new Gem_blue(), new Gem_blue()];
var selector = new Selector();
var allHearts = [new Heart(0), new Heart(30), new Heart(60), new Heart(90), new Heart(120)];
var allStars = [new Star(0), new Star(50), new Star(100), new Star(150), new Star(200), new Star(250), new Star(300), new Star(350), new Star(400), new Star(450)];

document.addEventListener('keyup', function(e){
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});