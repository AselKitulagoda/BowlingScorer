var Frame = require("Frame");
var FrameTen = require("FrameTen");

function Scorecard() {
    this.frames = [];    
}

Scorecard.prototype.frames= function (element) {
    for (var i=0;i<9;i++){
        this.frames.push(new Frame());
    }
    this.frames.push(new FrameTen());
};

Scorecard.prototype.sumAndEvaluateScores = function(){
    this.evaluateScores();
    var total = 0;
    for (var i=0;i<=9;i++){
     total += this.frames[i].score;
  }
    return total;
};

Scorecard.prototype.evaluateScores= function () {
  for (var i=0;i<9;i++){
      this.evaluateSpares(i);
      this.evaluateStrikes(i);
  }
  this.evaluateStrikesAndSparesFrameTen(9);
};

Scorecard.prototype.evaluateSpares = function (i) {
    if (this.frames[i].isSpare()){
        this.frames[i].score += this.frames[i+1].firstShot;
    }
};

Scorecard.prototype.evaluateStrikes = function (i) {
    if (this.frames[i].isStrike()){
        this.frames[i].score += (this.frames[i+1].firstShot + this.evaluateSecondRoll(i));
    }
};

Scorecard.prototype.evaluateSecondRoll = function (i) {
    return (this.frames[i+1].secondShot || this.frames[i+2].firstShot);
};

Scorecard.prototype.evaluateStrikesAndSparesFrameTen = function (i) {
  if (this.frames[i].isStrike()){
      this.frames[i].score += this.frames[i].secondShot + this.frames[i].thirdShot;
  }
  if (this.frames[i].secondShot === 10){
      this.frames[i].score += this.frames[i].thirdShot;
  }
  if (this.frames[i].isSpare()){
      this.frames[i].score += this.frames[i].thirdShot;
  }


};