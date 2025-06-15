let angle = 0;
let pointsEarth = [];
let pointsC = [];
let pointsA = [];
let pointsD = [];
let font;

function preload() {
  font = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(600, 400);
  colorMode(HSL);
  strokeWeight(2);
  textSize(180);
  textFont(font);

  // Generate Earth points (lat/lon grid)
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

  // Generate points for "C", "A" and "D"
  pointsC = font.textToPoints("C", 100, 250, 160, { sampleFactor: 0.5 });
  pointsA = font.textToPoints("A", 255, 250, 160, { sampleFactor: 0.5 });
  pointsD = font.textToPoints("D", 410, 250, 160, { sampleFactor: 0.5 });
}

function draw() {
  background(9, 40);
  translate(width / 2, height / 2);

  let radius = 150;
  angle += 0.01;

  // Draw Earth sphere points
  strokeWeight(3);
  for (let pt of pointsEarth) {
    // Rotate sphere
    let rotatedX = pt.x * cos(angle) + pt.z * sin(angle);
    let rotatedZ = -pt.x * sin(angle) + pt.z * cos(angle);
    let rotatedY = pt.y;

    // Perspective projection
    let distance = 0;
    let zOffset = rotatedZ + distance;
    let px = (rotatedX / zOffset) * radius;
    let py = (rotatedY / zOffset) * radius;

    // Rough land/ocean color
    if (abs(pt.lat) > 60 || (pt.lon > -60 && pt.lon < 60 && pt.lat < 20)) {
      stroke(210, 100, 60); // ocean blue
    } else {
      stroke(120, 70, 40); // land green
    }

    point(px, py);
  }

  // Draw "C", "A" and "D" points in front with fluid motion
  strokeWeight(1);
  stroke(28,233,233);

  for (let pt of [...pointsC, ...pointsA, ...pointsD]) {
    // Add a subtle oscillation for fluidity
    let xWiggle = sin(frameCount * 0.1 + pt.y * 0.05) * 2;
    let yWiggle = cos(frameCount * 0.1 + pt.x * 0.05) * 2;
    point(pt.x - width / 2 + xWiggle, pt.y - height / 2 + yWiggle);
  }
}
