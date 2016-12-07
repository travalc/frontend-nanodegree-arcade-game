// This file creates the Player and Enemy classes and subclasses, defines their methods, instantiates them and assigns controls.
// Created by Travis Alcantara. Updated on 12/7/2016

var GAME_WIDTH = 900;
var GAME_HEIGHT = 400;
var score = 0;
var level = 1;

function loadScore() { // Draws the score on bottom right
    ctx.font = "30pt impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.fillText("SCORE:" + " " + score, 800, 540);
    ctx.strokeText("SCORE:" + " " + score, 800, 540);
}

function loadLevel() { // Draws the current level on the bottom left
    ctx.font = "30pt impact";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.fillText("LEVEL:" + " " + level, 20, 540);
    ctx.strokeText("LEVEL:" + " " + level, 20, 540);
}

var Enemy = function(x, y, speed) { //Enemy superclass
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.width = 50;
    this.height = 50;
};

var RightEnemy = function(x, y, speed) { // Right moving enemy subclass
    Enemy.call(this, x, y, speed);
};
RightEnemy.prototype = Object.create(Enemy.prototype);
RightEnemy.prototype.constructor = RightEnemy;

var LeftEnemy = function(x, y, speed) { // Left moving enemy subclass
    Enemy.call(this, x, y, speed);
};
LeftEnemy.prototype = Object.create(Enemy.prototype);
LeftEnemy.prototype.constructor = LeftEnemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
RightEnemy.prototype.update = function(dt) { // Moves RightEnemy class enemies to the right
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 1015) {
        this.x = (dt * this.speed * 10) + this.x;
    } else if (this.x >= 1015) {
        this.x = -20;
        this.x = (dt * this.speed * 10) + this.x;

    }

};

LeftEnemy.prototype.update = function(dt) { //Moves LeftEnemy class enemies to the left
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > -40) {
        this.x = this.x - (dt * this.speed * 10);
    } else if (this.x <= -40) {
        this.x = 1015;
        this.x = this.x - (dt * this.speed * 10);
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() { // Create Player class
    this.sprite = 'images/char-boy.png';
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT;
    this.width = 50;
    this.height = 50;
};

Player.prototype.update = function() {
    this.youWin();
    this.checkCollisions();
};

Player.prototype.youWin = function() { // Checks if player has reached the water
    var difficultyMultiplier = 1;
    if (this.y === 0) {
        this.resetPosition(); // Moves player back to start
        score += 100; // Adds to the score
        level++; // Increases current level
        difficultyMultiplier += 0.1; // Increases difficulty
        for (var i = 0, len = allEnemies.length; i < len; i++) {
            allEnemies[i].speed = allEnemies[i].speed * difficultyMultiplier; // Increases speed of enemies as difficulty increases
        }
    }
    if (allEnemies.indexOf(enemy2) < 0 && level === 2) { // These lines add enemies to the screen as level increases
        allEnemies.push(enemy2);
    }
    if (allEnemies.indexOf(enemy4) < 0 && level === 4) {
        allEnemies.push(enemy4);
    }
    if (allEnemies.indexOf(enemy6) < 0 && level === 6) {
        allEnemies.push(enemy6);
    }
    if (allEnemies.indexOf(enemy8) < 0 && level === 8) {
        allEnemies.push(enemy8);
    }
};

Player.prototype.checkCollisions = function() { // This function checks if player has touched an enemy
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x + this.height > allEnemies[i].x && allEnemies[i].x + allEnemies[i].width > this.x && this.y + this.height > allEnemies[i].y && allEnemies[i].y + allEnemies[i].height > this.y) {
            this.resetPosition();
            console.log("YOU LOSE!");
        }
    }
};

Player.prototype.resetPosition = function() { // Resets player to start position
    this.x = GAME_WIDTH / 2;
    this.y = GAME_HEIGHT;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    if (direction === 'left' && this.x > 0) {
        this.x = this.x - 50;
    }
    if (direction === 'right' && this.x < GAME_WIDTH) {
        this.x = this.x + 50;
    }
    if (direction === 'up' && this.y > 0) {
        this.y = this.y - 50;
    }
    if (direction === 'down' && this.y < GAME_HEIGHT) {
        this.y = this.y + 50;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new RightEnemy(50, 50, 20);
var enemy2 = new RightEnemy(700, 50, 20);
var enemy3 = new LeftEnemy(500, 100, 20);
var enemy4 = new LeftEnemy(100, 100, 20);
var enemy5 = new RightEnemy(150, 150, 20);
var enemy6 = new RightEnemy(400, 150, 20);
var enemy7 = new LeftEnemy(200, 200, 20);
var enemy8 = new LeftEnemy(600, 200, 20);

var allEnemies = [enemy1, enemy3, enemy5, enemy7];

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
