# Creative-Coding-Portfolio-

This repository contains all the code for the exercises in my Creative Coding portfolio.

## Experiment  1 - Mouse Disturber 

![Screenshot 2025-05-29 213303](https://github.com/user-attachments/assets/0c71d4e2-3d71-4244-aa2d-2b3a79726322)

A mouse distuber that contains 3 main behaviours using delta axes, Chase, Repel. amd Orbit.

You can view the sketch here - https://editor.p5js.org/mooshimango/sketches/eXqG64M0J

# The raw files can be found in [Mouse Disturber](https://github.com/mooshimango/Creative-Coding-Portfolio-/tree/main/Mouse%20Disturber)

When creating this experiment, my main goal was to create something simple given my rather lacking maths ability, but I knew I wanted to prioritise smooth responsivity when an object interacts with the mouse. I wanted to keep the three modes simple so that I could achieve a satisfying result without getting lost in complexity. The mode variable is assigned to the inbuilt mousePressed function, allowing the user to cycle through the different behaviours. The x and y variables are assigned to Mouse X and Mouse Y so that I couuld alter the behaviour of the circle based on the mouse position. The angle variable is used in the Orbit mode to alter the startuing angle in relation to x and y. Each mode is seperated my simple if statements that correspond to each behaviour, since I felt that this was the easiest way to implement the experiment considering the current scope of my knowledge. To create a slight trail on the background I used aplpha values to control the transparency of the background itself, which allows the previous frames to be displayed, creating a satisfying trail, which honestly took a while to figure out, since I coundn't remember whether or not p5.js draws objects once or at every new frame. When I was looking into the logistics of particle emmission on mouse movement, and trying to wrap my head around OOP and classes, I decided that it posed a bit too much of a challenge for me at the moment, although I know that once I learn it, the flexibility of my programming will improve a lot. I am glad how the mouse disturber turned out, but I do wish I was able to add some dynamic particle behaviour to elevate the depth of my experiment just a little bit more. 
 

``` l
let mode = 0;
let x = 300;
let y = 200;
let angle = 0;

function setup() {
  createCanvas(600, 400);
  background(30); // draw once so we don't start with transparent bg
}

function draw() {
  fill(30, 30, 30, 30); // last value = alpha for transparency
  rect(0, 0, width, height);

  fill(255, 100, 100);
  noStroke();
  ellipse(x, y, 50);

  if (mode === 0) {
    //use === to ensure mode changes properly
    // chase
    x += (mouseX - x) * 0.1;
    y += (mouseY - y) * 0.1;
  } else if (mode === 1) {
    // repel
    let dx = x - mouseX;
    let dy = y - mouseY;
    let d = sqrt(dx * dx + dy * dy); //use delta units to measure difference multiplying the square root
    if (d < 100) {
      x += dx / 5;
      y += dy / 5;
    }
  } else if (mode === 2) {
    // orbit
    x = mouseX + cos(angle) * 50;
    y = mouseY + sin(angle) * 50; //trig ratio to determine the correct angle
    angle += 3; //creates dual oribiting effect
  }
}

function mousePressed() {
  //function call to change mode when mouse is clicked
  mode = (mode + 1) % 3;
}
```

## Experiment 2 - Audio Visualiser

![image](https://github.com/user-attachments/assets/f95f32a2-e4a1-41dc-88c7-41d4554ac601)

An audio visualiser with four unique behaviours when recieving microphone input.

You can view the sketch here - https://editor.p5js.org/mooshimango/sketches/42iR_HfxA

# The raw files can be found in [Audio Visualiser](https://github.com/mooshimango/Creative-Coding-Portfolio-/tree/main/Audio%20Visualiser)

The audio visualiser was the first project I started working on, and I started from a simple grey circle that moved upwards from the bottom of the screen, using the p5 reference. I then built it up from there by implementing a similar logic to the one I used for the mouse disturber, using a series of if statements to seperate each behaviour as well as clicking to switch to the next mode, which turned out to be a lot more transferable than I thought it would be initially. Once I had finished the first  mode of the simple pulsing sphere, I realisted that the circle was snapping to different sizes immediately, which I then reaslised was due to the lack of easing. I then refactored the code slightly by including smoothedSize and targetSize variables, that ease the transition and limit that the circle could grow by mapping them to the microphone level and using a col (colour) variable to alter the colours, which I believe makes it more dynamic. I would say overall that my favourite mode is the chunky bars that overlap. This ended up being a happy accident where I initially started out with a few thinner bars that all moved at the same time, more akin to a standard bar graph. Then after I increased the width of the bars accross the screen using spacing and totalWidth variables I felt that the end result became a lot more pleasing. The third mode is a stretched elipse with a slight rotation using radians to measure the correct rotation angle. I was struggling to come up with a behaviour for the fourth mode, so I thought that I could make the background flash to create a sense of responsiveness, even though it is more on the basic side. I did experiment with ffts to try and create more dynamic visualisations, but my coding limitations unfortunately got in the way.

```
let mic //mic input
let amplitude; 
let mode = 1; //mode selecter
let smoothedSize = 0;  //smoothes out size changes based on microphone level
let angle = 50;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic); //setup mic for input
  textAlign(CENTER, CENTER);
  textSize(20);
  fill(255);
}

function draw() {
  background(0);

  let level = amplitude.getLevel();
  let targetSize = map(level, 0, 0.3, 10, 300);
  targetSize = constrain(targetSize, 10, 300);
  
  // easing
  smoothedSize += (targetSize - smoothedSize) * 0.1;

  // colour based on volume
  let col = map(level, 0, 0.3, 32, 255);
  fill(col, 200, 255 - col);

  push(); //group together visualiser logic 
  translate(width / 2, height / 2);

  if (mode === 1) {
    ellipse(0, 10, smoothedSize);
  } else if (mode === 2) {
    rectMode(CENTER);
    let barCount = 15;
    let spacing = 40;
    let totalWidth = barCount * spacing;
    let startX = -totalWidth / 2 + spacing / 2;
    let squares = 20;

    for (let i = 0; i < barCount; i++) { //for loop to control bar amount and spacing
      let x = startX + i * spacing;
      let hScale = 1 + 0.5 * sin(frameCount * 0.1 + i); // slight variation
      rect(x, 0, 90, -smoothedSize * hScale);
    }

  } else if (mode === 3) {
    rotate(radians(angle));  //use radians inbuilt function to get correct angle
    ellipse(0, 0, smoothedSize / 2, smoothedSize);
  } else if (mode === 4) {
    background(col, 50, 255 - col);
  }

  pop();

  angle += 0.5; // slow rotation

  fill(255);
  text("Click to change visualiser: " + mode, width / 2, 30);
}

function mousePressed() {
  mode++; //switch mode
  if (mode > 4) {
    mode = 1;
  }
}

```
 
## Experiment 3 - One-key Game

![Screenshot 2025-06-01 221957](https://github.com/user-attachments/assets/6f1e0863-57cc-4a91-b16e-48a66a0dda6c)

A one-key game inspired by Pong for arcade systems created in p5js.

You can view the sketch here - https://editor.p5js.org/mooshimango/sketches/ytpqVyOZV

The raw files can be found here - [1 Key Game](https://github.com/mooshimango/Creative-Coding-Portfolio-/tree/main/1%20Key%20Game)

From the lectures I knew I wanted to create some form of pong, as this is a classic that started out as a single key game mechanically, therefore it was one of the first ideas I came up with. I stared by drawing a single paddle on the left using the rect function and making it move up and down, then I was debating in my head whether or not I wanted the paddle to move when holding a key or just pressing a key once, since the original game was played using a single joystick. I strongly feel that the hardest thing for me to implement was the collision and physics calculations that apply to the ball ofter touching the player or enemy paddles, since I really wanted to make it feel like the original Atari game. After much trial and error I was able to replicate it somewhat well through mathematical calculations that apply to the ball and paddle. The ball also checks to see if it is off-screen on the left and right hand side. If the ball leaves the left side a single life is lost, whereas the right side adds one to the score. If the player manages to score ten points then the player wins. As I write this my main regret when developing this experiment was that my initial plan of sprucing up the visuals fell out of the scope of development as simply getting the collision physics to behave started to feel like an endless battle at points, I had an idea to use noise to simulate liquid when the ball hits the paddles, but I couldn't get it to work in a way that felt satisfying or realistic so this would be something that I would love to try and implement into the project at a later time. Another small issue I found was that there is no delay between when the ball goes off screen and when the next pont starts, I thought it was to do with the colour flashes, adjusting the code broke the flashes all together. Ultimately, I am happy with how the final implementation turned out, expecially physics wise, and refamiliarising myself with what we learnt in class for all three of these experiments has been truly refreshing. I do wish I could have explored more ways to alter behaviour, as I felt slighly limited by my own ability, despite also feeling like I've accomplished something I am happy with for each experiment overall. :)

```
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

 

function resetBall(direction = 1) { //ball respawning function
  ball = {
    x: width / 2,
    y: height / 2,
    size: 20,
    vx: direction * ballSpeed,
    vy: random(-1, 1) * ballSpeed
  };
}
```
