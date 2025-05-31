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

