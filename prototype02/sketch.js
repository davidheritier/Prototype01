var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // show interim results
var mySound, amp, fft, wght, wdth;

function preload() {
  mySound = loadSound('Schpountz.mp3');
}

function setup() {
  amp = new p5.Amplitude();
  fft = new p5.FFT();
  fft.setInput();

  mySound.play();

  myRec.onResult = showResult;
  myRec.start();

  noCanvas();
}

function draw() {
  var spectrum = fft.analyze();
  var energy = fft.getEnergy("mid");
  var level = amp.getLevel();

  wght = map(level, 0, 1, 100, 900);
  wdth = map(level, 0, 1, 50, 200);
}

function showResult() {
  if (myRec.resultValue == true) {
    quote = createP("&mdash; " + myRec.resultString);
    console.log(myRec.resultString);
    quote.style("font-weight", wght);
    quote.style("font-stretch", wdth + "%");
    pageScroll();
  }

  function pageScroll() {
    window.scrollBy(0, 1);
    scrolldelay = setTimeout(pageScroll, 1);
  }
}