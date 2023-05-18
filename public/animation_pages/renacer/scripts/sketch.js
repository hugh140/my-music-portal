const size = 500;
let isPlaying = false;

let kick, kickVolume;
let ambient, ambientVolume;
let hihats, hihatsVolume;
let ambient2, ambient2Volume;
let drums, drumsVolume;

let points = [];

function preload() {
  kick = new Tone.Player("assets/kickRenacer.mp3").toDestination();
  drums = new Tone.Player("assets/drumsRenacer.mp3").toDestination();
  hihats = new Tone.Player("assets/hihatsRenacer.mp3").toDestination();
  ambient = new Tone.Player("assets/ambientRenacer.mp3").toDestination();
  ambient2 = new Tone.Player("assets/ambient2Renacer.mp3").toDestination();
}

function setup() {
  const canvas = createCanvas(700, 700);

  for (let i = 0; i < 4; i++) points.push(new Point());

  canvas.mousePressed(() => {
    if (!isPlaying) {
      Tone.loaded().then(() => {
        kick.start();
        drums.start();
        hihats.start();
        ambient.start();
        ambient2.start();
        isPlaying = true;
      });
    }
  });
}

function draw() {
  background(map(ambientVolume?.getLevel() ?? 0, 0, 0.1, 10, 15));
  const kickLevel = kickVolume?.getLevel();

  console.log(kick.volume.value)

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
