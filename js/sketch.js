/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new Kelsen_Dancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class Kelsen_Dancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.period = 200;
    this.phase = 0;
    this.amplitude = 20;
    this.dots = [];
    this.isMoving = false;
    this.moveStartFrame = 0;
    this.moveDuration = 300;
    for (let angle = PI/6; angle <= 5*PI/6; angle += PI/36) {
      this.dots.push({
        angle: angle,
        radius: map(random(), 0, 1, 50, 100),
        color: [random(255), random(255), random(255)]
      });
    }
  }
  update() {
    this.phase += 0.2;
    this.dots.forEach(dot => {
      dot.angle += PI/36;
      dot.radius = map(random(), 0, 1, 50, 100);
      dot.color = [random(255), random(255), random(255)];
    });
    let d = dist(this.x, this.y, mouseX, mouseY);
    if(mouseIsPressed && d < 50 && !this.isMoving) {
      this.isMoving = true;
      this.moveStartFrame = frameCount;
    }
    if(this.isMoving) {
      if(frameCount - this.moveStartFrame < this.moveDuration) {
        let perspY = height * 0.3; 
        let floorY = height * 0.6; 
        this.y = lerp(this.y, random(floorY, height * 0.95), 0.05);
        let scale = map(this.y, perspY, height, 0.1, 1);  
        let maxX = width/2 + (width * scale);  
        let minX = width/2 - (width * scale);  
        this.x = lerp(this.x, random(minX, maxX), 0.05);
      } else {
        this.isMoving = false;
      }
    }
  }
  display() {
    push();
    translate(this.x, this.y);
    noFill()
    stroke(255);
    let topLeftX = this.amplitude * sin(TWO_PI * -50 / this.period + this.phase) - 50;
    let topRightX = this.amplitude * sin(TWO_PI * -50 / this.period + this.phase) + 50;
    let downLeftX = this.amplitude * sin(TWO_PI * 50 / this.period + this.phase) - 50;
    let downRightX = this.amplitude * sin(TWO_PI * 50 / this.period + this.phase) + 50;
    //left line
    beginShape();
    for (let y = -50; y <= 50; y += 4) {
      let x = this.amplitude * sin(TWO_PI * y / this.period + this.phase) - 50;
      vertex(x, y);
    }
    endShape();
    //right line
    beginShape()
    for (let y = -50; y <= 50; y += 4) {
      let x = this.amplitude * sin(TWO_PI * y / this.period + this.phase) +50;
      vertex(x, y);
    }
    endShape()
    //curve above the two lines
    let arcCenterX = (topLeftX + topRightX) / 2;
    arc(arcCenterX, -50, 100, 100, PI, TWO_PI);
    //eyes
    fill(255);
    ellipse(arcCenterX-20, -50, 20, 20);
    ellipse(arcCenterX+20, -50, 20, 20);
    fill(0);
    ellipse(arcCenterX-20, -50, 12, 12);
    ellipse(arcCenterX+20, -50, 12, 12);
    //mouth
    push();
    translate(arcCenterX, -30); 
    fill(255);
    stroke(255);
    beginShape();
    vertex(-5, 0);   
    vertex(0, 10);     
    vertex(5, 0); 
    line(0, -5, 0, 5);
    endShape();
    pop();
    //colorful dots as antennas
    let startAngle = PI/6;
    let endAngle = 5*PI/6;
    let i = 0;
    for (let angle = startAngle; angle <= endAngle; angle += PI/36) {
      push();
      let x = this.dots[i].radius * cos(angle) + (downLeftX + downRightX)/2;
      let y = this.dots[i].radius * sin(angle);
      translate(x, y);
      rotate(angle+PI/2);
      ellipse(0, 0, 10, 20)
      pop();
      fill(this.dots[i].color);
      i++;
    }
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/