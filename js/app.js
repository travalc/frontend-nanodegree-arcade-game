// Enemies our player must avoid
var gameWidth = 900;
var gameHeight = 400;
var score = 0;
var level = 1;

function loadScore() {
  ctx.font = "30pt impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.fillText("SCORE:" + " " + score, 800, 540);
  ctx.strokeText("SCORE:" + " " + score, 800, 540);
};

function loadLevel() {
  ctx.font = "30pt impact";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.fillText("LEVEL:" + " " + level, 20, 540);
  ctx.strokeText("LEVEL:" + " " + level, 20, 540);
}

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 50;
};

var RightEnemy = function(x, y, speed) {
  Enemy.call(this, x, y, speed);
};
RightEnemy.prototype = Object.create(Enemy.prototype);
RightEnemy.prototype.constructor = RightEnemy;

var LeftEnemy = function(x, y, speed) {
  Enemy.call(this, x, y, speed);
};
LeftEnemy.prototype = Object.create(Enemy.prototype);
LeftEnemy.prototype.constructor = LeftEnemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
RightEnemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 1015) {
      this.x = 0.6 * this.speed + this.x;
    }
    else if (this.x >= 1015) {
      this.x = -20;
      this.x = 0.6 * this.speed + this.x;

    }

};

LeftEnemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > -40) {
      this.x = this.x - 0.6 * this.speed;
    }
    else if (this.x <= -40) {
      this.x = 1015;
      this.x = this.x - 0.6 * this.speed;

    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = gameWidth / 2;
  this.y = gameHeight;
  this.width = 50;
  this.height = 50;
};

Player.prototype.update = function() {
  this.youWin();
  this.checkCollisions();

};

Player.prototype.youWin = function() {
  if (this.y === 0) {
    this.resetPosition();
    score += 100;
    level ++;
    console.log("YOU WIN! Score: " + score);
  }
};

Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i ++) {
    if (this.x + this.height > allEnemies[i].x && allEnemies[i].x + allEnemies[i].width > this.x && this.y + this.height > allEnemies[i].y && allEnemies[i].y + allEnemies[i].height > this.y) {
      this.resetPosition();
      console.log("YOU LOSE!");
    }
  }
};

Player.prototype.resetPosition = function() {
  this.x = gameWidth / 2;
  this.y = gameHeight;
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
  if (direction === 'left' && this.x > 0) {
    this.x = this.x - 50;
  }
  if (direction === 'right' && this.x < gameWidth) {
    this.x = this.x + 50;
  }
  if (direction === 'up' && this.y > 0) {
    this.y = this.y - 50;
  }
  if (direction === 'down' && this.y < gameHeight) {
    this.y = this.y + 50;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new RightEnemy(50, 50, 17);
var enemy2 = new RightEnemy(700, 50, 17);
var enemy3 = new LeftEnemy(500, 100, 5);
var enemy4 = new LeftEnemy(100, 100, 5);
var enemy5 = new RightEnemy(150, 150, 11);
var enemy6 = new RightEnemy(400, 150, 11);
var enemy7 = new LeftEnemy(200, 200, 20);
var enemy8 = new LeftEnemy(600, 200, 20);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];
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
