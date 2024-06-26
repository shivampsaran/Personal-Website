var song = loadSound('SpotifyMate.com - Alone Again - The Weeknd.mp3')
var fft
var img



function setup() {
  createCanvas(700, 700);
  angleMode(DEGREES)
  rectMode(CENTER)
  fft = new p5.FFT();

  
}

function draw() {
  background(0)
  
  translate(width/2 , height/2)
  
  fft.analyze()
  amp = fft.getEnergy(20, 200)
  
  var alpha = map(amp, 0, 255, 180, 150)
  fill(0, alpha)
  noStroke()
  rect(0,0,width, height)
  
  stroke(255)
  strokeWeight(1.5)
  noFill()
  
  var wave = fft.waveform()
  
  for (var t = -1; t<=1; t+= 2){
      beginShape()
  for (var i = 0; i <= 180; i += 0.5) {
    var index = floor(map(i, 0, 180, 0, wave.length - 1))
    
    var r = map(wave[index], -1, 1, 150, 350)
    
    var x = r * sin(i) * t
    var y = r * cos(i)
    vertex(x,y)
  }
  endShape()
  }

}

function mouseClicked(){
  if (song.isPlaying()) {
    song.pause()
    noLoop()
  } else {
    song.play()
    loop()
  }
}