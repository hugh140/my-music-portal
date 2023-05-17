class Point {
  constructor() {
    this.angle = Math.random() * 100;
    this.incrementAngle = random(-0.1, 0.1);
    this.pointRotate = createVector(width / 2, height / 2);
    this.x = 0
    this.y = 0
  }

  draw(kickLevel) {
    this.pointRotate.x = 250 * sin(this.angle) + width / 2;
    this.pointRotate.y = 250 * cos(this.angle) + width / 2;
    this.angle += this.incrementAngle;
    if (kickLevel > 0.2) this.incrementAngle = random(-0.1, 0.1);

    fill(255);
    circle(this.pointRotate.x, this.pointRotate.y, 20);

    this.x = this.pointRotate.x
    this.y = this.pointRotate.y
  }

  x() {
    return this.x
  }

  y() {
    return this.y
  }
}
