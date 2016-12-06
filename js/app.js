// Enemies our player must avoid
var gameWidth = 400;
var gameHeight = 400;
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

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 510) {
      this.x = Math.random() * this.speed + this.x;
    }
    else if (this.x >= 510) {
      this.x = -20;
      this.x = Math.random() * this.speed + this.x;

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
  this.x = 200;
  this.y = 400;
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
    console.log("YOU WIN!");
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
  this.x = 200;
  this.y = 400;
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
var enemy1 = new Enemy(50, 50, 17);
var enemy2 = new Enemy(300, 100, 5);
var enemy3 = new Enemy(150, 150, 11);
var enemy4 = new Enemy(200, 200, 6);

var allEnemies = [enemy1, enemy2, enemy3, enemy4];
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
