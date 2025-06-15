let angleOrbit = 0;
let angleRotation = 0;
let angleMoon = 0;
let pointsEarth = [];
let earthRadius = 60;
let orbitRadius = 150;
let moonRadius = 20;
let moonDistance = 40;
let stars = [];
let comets = [];

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSL);
  textFont(font);
  strokeWeight(2);

  // Earth point cloud
  let detail = 10;
  for (let lat = -90; lat <= 90; lat += detail) {
    for (let lon = -180; lon <= 180; lon += detail) {
      let radLat = radians(lat);
      let radLon = radians(lon);

      let x = cos(radLat) * cos(radLon);
      let y = cos(radLat) * sin(radLon);
      let z = sin(radLat);

      pointsEarth.push({ x, y, z, lat, lon });
    }
  }

  // Stars
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(-width, width),
      y: random(-height, height),
      brightness: random(60, 100)
    });
  }

  // Comets
  for (let i = 0; i < 3; i++) {
    comets.push(new Comet());
  }
}

function draw() {
  background(240, 10, 5); // dark space
  translate(width / 2, height / 2);

  // Draw stars
  noStroke();
  for (let star of stars) {
    fill(0, 0, star.brightness);
    ellipse(star.x, star.y, 1.5, 1.5);
  }

  // Draw Sun
  fill(50, 100, 60);
  noStroke();
  ellipse(0, 0, 40, 40);

  // Earth position
  let earthX = cos(angleOrbit) * orbitRadius;
  let earthY = sin(angleOrbit) * orbitRadius;

  angleOrbit += 0.005;
  angleRotation += 0.02;
  angleMoon += 0.04;

  // Draw Earth
  strokeWeight(2);
  for (let pt of pointsEarth) {
    let rotatedX = pt.x * cos(angleRotation) + pt.z * sin(angleRotation);
    let rotatedZ = -pt.x * sin(angleRotation) + pt.z * cos(angleRotation);
    let rotatedY = pt.y;

    let zOffset = rotatedZ + 2;
    let px = (rotatedX / zOffset) * earthRadius;
    let py = (rotatedY / zOffset) * earthRadius;

    if (abs(pt.lat) > 60 || (pt.lon > -60 && pt.lon < 60 && pt.lat < 20)) {
      stroke(210, 100, 60); // ocean
    } else {
      stroke(120, 70, 40); // land
    }

    point(earthX + px, earthY + py);
  }

  // Draw Moon
  let moonX = earthX + cos(angleMoon) * moonDistance;
  let moonY = earthY + sin(angleMoon) * moonDistance;

  fill(0, 0, 90);
  noStroke();
  ellipse(moonX, moonY, moonRadius, moonRadius);

  // Draw comets
  for (let comet of comets) {
    comet.update();
    comet.display();
  }
}

class Comet {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-width, 0);
    this.y = random(-height / 2, height / 2);
    this.vx = random(2, 4);
    this.vy = random(-0.5, 0.5);
    this.history = [];
    this.hue = random(0, 360);
  }

  update() {
    this.history.push({ x: this.x, y: this.y });
    if (this.history.length > 20) this.history.shift();

    this.x += this.vx;
    this.y += this.vy;

    if (this.x > width || this.y < -height / 2 || this.y > height / 2) {
      this.reset();
    }
  }

  display() {
    noFill();
    for (let i = 0; i < this.history.length - 1; i++) {
      let a = this.history[i];
      let b = this.history[i + 1];
      stroke(this.hue, 100, 70, map(i, 0, this.history.length - 1, 0.1, 1));
      line(a.x - width / 2, a.y, b.x - width / 2, b.y);
    }

    fill(this.hue, 100, 80);
    noStroke();
    ellipse(this.x - width / 2, this.y, 5, 5);
  }
}
