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

  if (mode === 0) { //if statements to seperate mode
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
