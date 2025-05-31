let mic //mic input
let amplitude; 
let mode = 1; //mode selecter
let smoothedSize = 0;  //smoothes out size changes
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

  push();
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

    for (let i = 0; i < barCount; i++) {
      let x = startX + i * spacing;
      let hScale = 1 + 0.5 * sin(frameCount * 0.1 + i); // slight variation
      rect(x, 0, 90, -smoothedSize * hScale);
    }

  } else if (mode === 3) {
    rotate(radians(angle));
    ellipse(0, 0, smoothedSize / 2, smoothedSize);
  } else if (mode === 4) {
    background(col, 100, 255 - col);
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
