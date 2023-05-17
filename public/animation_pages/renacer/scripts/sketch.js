const size = 500;

let kick, kickVolume;
let ambient, ambientVolume;
let hihats, hihatsVolume;
let points = [];

function preload() {
  soundFormats("wav");
  kick = loadSound("assets/4renacer.wav");
  ambient = loadSound("assets/1renacer.wav");
  hihats = loadSound('assets/3renacer.wav')
}

function setup() {
  const canvas = createCanvas(700, 700);

  for (let i = 0; i < 4; i++) points.push(new Point());

  canvas.mousePressed(() => {
    if (!kick.isPlaying()) {
      kick.play();
      kickVolume = new p5.Amplitude();
      kickVolume.setInput(kick);

      ambient.play();
      ambientVolume = new p5.Amplitude();
      ambientVolume.setInput(ambient);

      hihats.play();
      hihatsVolume = new p5.Amplitude();
      hihatsVolume.setInput(hihats);
    }
  });
}

function draw() {
  background(map(ambientVolume?.getLevel() ?? 0, 0, 0.1, 10, 15));
  const kickLevel = kickVolume?.getLevel();

  noFill();
  strokeWeight(kickLevel * 100);
  stroke(255);
  const rythmSize = size + kickLevel * 150;
  arc(width / 2, height / 2, rythmSize, rythmSize, 0, HALF_PI);
  arc(width / 2, height / 2, rythmSize, rythmSize, HALF_PI, PI);
  arc(width / 2, height / 2, rythmSize, rythmSize, PI, PI + HALF_PI);
  arc(width / 2, height / 2, rythmSize, rythmSize, PI + HALF_PI, TWO_PI);

  points.forEach((point) => {
    point.draw(kickLevel);
    stroke(map(kickLevel ?? 0, 0, 0.1, 100, 200));
    strokeWeight(1);
    points.forEach((point2) => {
      line(point?.x, point?.y, point2?.x, point2?.y);
    });
  });
}
