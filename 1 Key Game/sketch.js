let ball;
let paddle;
let ballSpeed = 5;
let paddleSpeed = 5;
let paddleDir = 1;
let score = 0;
let enemyPaddle; 
let enemyPaddleSpeed = 2;
let enemyPaddleDir = 1;
let lives = 3;

function setup() {
  createCanvas(600, 400);
  resetBall();
  paddle = { //paddle dimensions
    x: 30,
    y: height / 2,
    w: 15,
    h: 80
  };
  enemyPaddle = {// enemy paddle dimensions
    x: 560,
    y: height / 2,
    w: 15,
    h: 80
  };
  textAlign(CENTER, CENTER);
  textSize(20);
}

function draw() {
  background(255);

  fill(0);
  ellipse(ball.x, ball.y, ball.size);

  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y < 0 || ball.y > height) {
    ball.vy *= -1;
  }

  if (
    ball.x - ball.size / 2 < paddle.x + paddle.w / 2 && //ball collision logic
    ball.x - ball.size / 2 > paddle.x - paddle.w / 2 &&
    ball.y > paddle.y - paddle.h / 2 &&
    ball.y < paddle.y + paddle.h / 2
  ) {
    ball.vx *= -1; //move the ball in the opposite direction from the paddle
    ball.x = paddle.x + paddle.w / 2 + ball.size / 2;
    enemyPaddleSpeed++;
  }

  if (
    ball.x + ball.size / 2 > enemyPaddle.x &&
    ball.x - ball.size / 2 < enemyPaddle.x + enemyPaddle.w &&
    ball.y + ball.size / 2 > enemyPaddle.y &&
    ball.y - ball.size / 2 < enemyPaddle.y + enemyPaddle.h
  ) {
    ball.vx *= -1;
    ball.x = enemyPaddle.x - ball.size / 2;
  }

  if (ball.x + ball.size / 2 < 0) {
    background(255,10,10); //flash red when life lost
    lives--;
    resetBall(1);
  }

  if (ball.x - ball.size / 2 > width) {
    background(10,255,100); //flash green when point scored
    resetBall(-1);
    score++;
  }

  fill(50, 150, 255);
  rectMode(CENTER);
  rect(paddle.x, paddle.y, paddle.w, paddle.h); //draw paddle

  paddle.y += paddleSpeed * paddleDir; //paddle movement
  if (paddle.y < paddle.h / 2 || paddle.y > height - paddle.h / 2) {
    paddleDir *= -1;
  }

  enemyPaddle.y += enemyPaddleSpeed * enemyPaddleDir; //enemy paddle movement
  if (enemyPaddle.y < 0 || enemyPaddle.y > height - enemyPaddle.h) {
    enemyPaddleDir *= -1;
  }

  fill(200, 20, 0); //draw enemy paddle
  rectMode(CORNER);
  rect(enemyPaddle.x, enemyPaddle.y, enemyPaddle.w, enemyPaddle.h);

  fill(0);
  text("Your score is " + score, width / 2, 50); //text to show game state
  text("Lives: " + lives, width / 2, 25);

  if (lives <= 0) {
    noLoop();
    text("Game Over", width / 2, height / 2);
  } else if (score >= 10) { // win state
    noLoop();
    text("You Win!", width / 2, height / 2); //win and lose check if lives are 0 or score is 10
  }
}

function keyPressed() { //change direction using space bar
  if (key === ' ') {
    paddleDir *= -1;
  }
}

function resetBall(direction = 1) { //ball respawning function
  ball = {
    x: width / 2,
    y: height / 2,
    size: 20,
    vx: direction * ballSpeed,
    vy: random(-1, 1) * ballSpeed
  };
}
