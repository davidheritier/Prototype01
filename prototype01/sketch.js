var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // show interim results
var mic, fft, wght, wdth;

function setup() {
  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
  mic.amp(1);

  myRec.onResult = showResult;
  myRec.start();

  var title = createP("parlez-moi");

  noCanvas();
}

function draw() {
  var spectrum = fft.analyze();
  var energy = fft.getEnergy("mid");
  var level = mic.getLevel();
  wght = map(energy, 0, 255, 100, 900);
  wdth = map(level, 0, 1, 50, 200);
}

function showResult() {
  if (myRec.resultValue == true) {
    var quote = createP("&mdash; " + myRec.resultString);
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