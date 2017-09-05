var i;
var app = app || {};

app.hp = 5;
app.score = 0;
app.base = 1;
var Engine = (function(global) {
	var doc = global.document,
		win = global.window,
		canvas = doc.createElement('canvas'),
		ctx = canvas.getContext('2d'),
		lastTime;

	var star_now,
		star_last;

	canvas.width = 505;
	canvas.height = 606;
	doc.body.appendChild(canvas);
	//the coefficient is used to make sure the speed of each bug is different.
	var coefficient = [Math.random() * 4 + 1, Math.random() * 4 + 1, Math.random() * 4 + 1];

	function main() {
		var now = Date.now(),
			dt = (now - lastTime) / 12.0;

		
		render();
		update(dt);

		ctx.font="40px Georgia";
		ctx.fillStyle = "#FFFF00";
		ctx.fillText(app.score, 10, 80);

		lastTime = now;

		//hp is the health point of player, when it goes 0, the player will die. Each time the player
		//encounter the but, it will lost one health point.
		if (player.collision_check(allEnemies)){
			app.hp--;
			//If the player is killed. Score and hp will be reset
			if (app.hp == 0){
				window.alert("GAME OVER");
				app.hp = 5;
				app.score = 0;
				app.base = 1;
			}
			player.lose();
		}

		//Each time the player get more 50 scores, there will be a star rain.
		check_score();

		if (player.win_check()){
			player.win();
			app.score += 10;
		}

		win.requestAnimationFrame(main);
	}

	function init(){
		reset();
		lastTime = Date.now();
		main();
	}

	function update(dt) {
		updateEntities(dt);
	}

	function updateEntities(dt) {
		var index = [65, 150, 235];
		for (i = 0; i < allEnemies.length; i++){
			allEnemies[i].update(dt * coefficient[i]);
			if (allEnemies[i].out_bound()){
				I = Math.round(Math.random() * 2.99 - 0.5);
		 		allEnemies[i] = new Enemy(index[I]);
		 		coefficient[i] = Math.random() * 4 + 1;
			}
		}
		selection = Resources.get(this.select_img);
		selector.update();
		player.update();
	}

	function render() {
		var rowImages = [
				'images/water-block.png',
				'images/stone-block.png',
				'images/stone-block.png',
				'images/stone-block.png',
				'images/grass-block.png',
				'images/grass-block.png'
		],
		numRows = 6,
		numCols = 5,
		row, col;

		for (row = 0; row < numRows; row++) {
			for (col = 0; col < numCols; col++) {
				ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
			}
		}
		renderEntities();
	}

	function renderEntities(){
		for (i = 0; i < allRocks.length; i++){
			allRocks[i].render();
		}
		for (i = 0; i < app.hp; i++){
			allHearts[i].render();
		}
		check_array_gem = gem_check(player, BlueGem);
		for (i = 0; i < BlueGem.length; i++){
			if (check_array_gem[i]){
				BlueGem[i].update();
				app.score += 5;
			}
			BlueGem[i].render();
		}
		allEnemies.forEach(function(enemy) {
			enemy.render();
		});
		selector.render();
		player.render();	
	}

	function reset(){};
	//The function is used to check whether the score is more 50 points than the last time
	//and generate the star rain in proper time.
	function check_score(){
		if (app.score >= app.base * 50){
			for (i = 0; i < allStars.length; i++){
				allStars[i].render();
				allStars[i].update();
			}
		}
		if (allStars[0].pos_Y == 500){
			for (i = 0; i < allStars.length; i++){
				allStars[i].reset();
			}
			app.base = Math.round(app.score / 50) + 1;
		}
	}

	Resources.load([
		'images/stone-block.png',
		'images/water-block.png',
		'images/grass-block.png',
		'images/enemy-bug.png',
		'images/Rock.png',
		'images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png',
		'images/Selector.png',
		'images/Heart.png',
		'images/Gem Blue.png',
		'images/Gem Green.png',
		'images/Gem Orange.png',
		'images/Star.png'
	]);
	Resources.onReady(init);

	global.ctx = ctx;
})(this);